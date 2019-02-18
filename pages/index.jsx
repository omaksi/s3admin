// @ts-check

import React from 'react'

import Layout from '../client/components/layout/Layout'
import ObjectTable from '../client/components/objectTable/ObjectTable'
import BucketSelect from '../client/components/bucketList/BucketList'
import Login from '../client/components/login/Login'
import BrowserHeader from '../client/components/browserHeader/BrowserHeader'
import Statistics from '../client/components/statistics/Statistics'
import BucketInfo from '../client/components/bucketInfo/BucketInfo'
import HeaderInfo from '../client/components/headerInfo/HeaderInfo'
import Search from '../client/components/search/Search'
import Navigation from '../client/components/navigation/Navigation'

import {
  listObjectsV2,
  getBucketLocation,
  listBuckets,
  genericS3Fetcher,
  bucketInfoActions,
} from '../client/fetchers'

import fetcher from '../utils/fetcher'

import { Tabs, Empty } from 'antd'

/**
 * @typedef {object} Props
 * @prop {string} className
 * @prop {number} numberProp
 */

/**
 * @typedef {object} State
 * @prop {string} accessKeyId
 * @prop {string} secretAccessKey
 * @prop {string} delimiter
 * @prop {string} continuationToken
 * @prop {string | undefined} selectedBucket
 * @prop {number} perPage
 * @prop {boolean} isLoggedIn
 * @prop {boolean} isTruncated
 * @prop {boolean} isLoading
 * @prop {number} loadedSoFar
 * @prop {number} sizeSoFar
 * @prop {string} activePrefix
 * @prop {boolean} autoAnalyze
 * @prop {number} totalFiles
 * @prop {number} totalSize
 * @prop {import('aws-sdk').S3.ObjectList} largest
 * @prop {import('aws-sdk').S3.ObjectList} smallest
 * @prop {string} loginError
 * @prop {import('aws-sdk').S3.Types.Buckets | undefined } buckets
 * @prop {import('aws-sdk').S3.Types.ListObjectsV2Output | undefined} objects
 * @prop {import('aws-sdk').S3.Types.GetBucketLocationOutput | undefined} bucketLocation
 */

/**
 * @extends {React.Component<Props, State>}
 */
export default class Index extends React.Component {
  state = {
    buckets: undefined,
    objects: undefined,
    selectedBucket: undefined,
    bucketLocation: undefined,
    isTruncated: false,
    loadedSoFar: 0,
    sizeSoFar: 0,
    delimiter: '/',
    accessKeyId: '',
    secretAccessKey: '',
    perPage: 100,
    isLoggedIn: false,
    activePrefix: '',
    isLoading: false,
    autoAnalyze: true,
    totalFiles: 0,
    totalSize: 0,
    largest: [],
    smallest: [],
    continuationToken: '',
    loginError: '',
  }

  componentDidMount = () => {
    window.addEventListener('beforeunload', (e) => {
      // Cancel the event
      e.preventDefault()
      // Chrome requires returnValue to be set
      e.returnValue = 'Are you sure?'
    })
  }

  isLoggedIn = () => {
    return this.state.accessKeyId && this.state.secretAccessKey && this.state.isLoggedIn
  }

  logout = () => {
    this.setState({
      buckets: undefined,
      objects: undefined,
      selectedBucket: undefined,
      bucketLocation: undefined,
      delimiter: '/',
      accessKeyId: '',
      secretAccessKey: '',
    })
  }

  /**
   * @param {string} accessKeyId
   * @param {string} secretAccessKey
   */
  handleLoginSubmit = async (accessKeyId, secretAccessKey) => {
    /**
     * @type {import('aws-sdk').S3.Types.ListBucketsOutput}
     */
    const res = await listBuckets({}, accessKeyId, secretAccessKey)

    console.log('received res', res)

    if (res.statusCode) {
      this.setState({
        loginError: res.message,
      })
    } else {
      this.setState({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        isLoggedIn: true,
        buckets: res.Buckets,
      })
    }
  }

  /**
   * @param {string} value
   * @returns {Promise<void>}
   */
  handleBucketSelectChange = async (value) => {
    console.log('handleBucketSelectChange', value)

    this.setState({ isLoading: true })

    /** @type {import('aws-sdk').S3.Types.GetBucketLocationOutput} */
    const bucketLocationRes = await getBucketLocation(
      { Bucket: value },
      this.state.accessKeyId,
      this.state.secretAccessKey
    )

    this.setState({
      isLoading: false,
      selectedBucket: value,
      bucketLocation: bucketLocationRes,
      activePrefix: '',
      continuationToken: '',
    })

    await this.loadObjects()

    if (this.state.autoAnalyze) {
      this.handleAnalyzeBucket()
    }

    // this.handleLoadBucketInfo()
  }

  /**
   * @param {string} value
   * @returns {Promise<void>}
   */
  handleSearchSubmit = async (value) => {
    console.log(value)
    /** @type {import('aws-sdk').S3.Types.ListObjectsV2Output} */
    const listObjectRes = await listObjectsV2(
      {
        Bucket: this.state.selectedBucket,
        Delimiter: this.state.delimiter,
        MaxKeys: this.state.perPage,
        Prefix: value,
      },
      this.state.accessKeyId,
      this.state.secretAccessKey
    )

    console.log('received res', listObjectRes)

    this.setState({
      objects: listObjectRes,
    })
  }

  handleSearchClear = async () => {
    this.setState({ activePrefix: '' }, () => {
      this.loadObjects()
    })
  }

  /**
   * @param {string} value
   * @returns {void}
   */
  handleDelimiterSubmit = (value) => {
    this.setState({ delimiter: value }, () => {
      this.loadObjects()
    })
  }

  /**
   * @param {string} value
   * @returns {Promise<void>}
   */
  handlePerPageChange = async (value) => {
    this.setState({ perPage: parseInt(value, 10) }, () => {
      this.loadObjects()
    })
  }

  /**
   * @param {string} newPrefix
   * @returns {Promise<void>}
   */
  handlePrefixChange = async (newPrefix) => {
    this.setState({ activePrefix: newPrefix }, () => {
      this.loadObjects()
    })
  }

  /**
   * @returns {Promise<void>}
   */
  handleLoadNext = async () => {
    this.loadObjects()
  }

  handleAutoAnalyzeChange = () => {
    this.setState({
      autoAnalyze: !this.state.autoAnalyze,
    })
  }

  loadObjects = async () => {
    this.setState({
      isLoading: true,
    })
    /** @type {import('aws-sdk').S3.Types.ListObjectsV2Output} */
    const listObjectRes = await listObjectsV2(
      {
        Bucket: this.state.selectedBucket,
        Delimiter: this.state.delimiter,
        MaxKeys: this.state.perPage,
        Prefix: this.state.activePrefix,
        ContinuationToken: this.state.continuationToken ? this.state.continuationToken : undefined,
      },
      this.state.accessKeyId,
      this.state.secretAccessKey
    )

    console.log('received objects', listObjectRes)

    const loadedSoFar =
      this.state.loadedSoFar + (listObjectRes.Contents ? listObjectRes.Contents.length : 0)

    console.log('loadedSoFar', loadedSoFar)

    this.setState({
      isLoading: false,
      objects: listObjectRes,
      isTruncated: listObjectRes.IsTruncated ? listObjectRes.IsTruncated : false,
      loadedSoFar,
      continuationToken: listObjectRes.NextContinuationToken
        ? listObjectRes.NextContinuationToken
        : '',
    })
  }

  handleAnalyzeBucket = async () => {
    this.setState({
      isLoading: true,
    })

    /** @type {[number, number,import('aws-sdk').S3.ObjectList,import('aws-sdk').S3.ObjectList ]} */
    const res = await fetcher(
      '/s3statistic',
      {
        method: 'POST',
      },
      {
        action: 'countStatistics',
        params: {
          Bucket: this.state.selectedBucket,
        },
        accessKeyId: this.state.accessKeyId,
        secretAccessKey: this.state.secretAccessKey,
      }
    )

    console.log('ANALYTICS', res)

    this.setState({
      totalFiles: res[0],
      totalSize: res[1],
      largest: res[2],
      smallest: res[3],
      isLoading: false,
    })
  }

  handleLoadBucketInfo = () => {
    Promise.all(
      bucketInfoActions.map((action) =>
        genericS3Fetcher(
          action,
          { Bucket: this.state.selectedBucket },
          this.state.accessKeyId,
          this.state.secretAccessKey
        )
      )
    ).then((values) => {
      console.log(values)
    })
  }

  render() {
    return (
      <Layout>
        <style jsx>{`
          .grid {
            height: 100vh;
            display: grid;
            grid-template-columns: 200px auto;
            grid-template-rows: auto;
          }
          .left_col {
            height: 100vh;
            overflow: scroll;
          }
          .right_col {
            height: 100vh;
            padding: 5px 0px 0;
          }
        `}</style>

        {!this.isLoggedIn() && (
          <Login onLoginSubmit={this.handleLoginSubmit} error={this.state.loginError} />
        )}
        {this.isLoggedIn() && (
          <div className="grid">
            <div className="left_col">
              <BucketSelect buckets={this.state.buckets} onChange={this.handleBucketSelectChange} />
            </div>
            <div className="right_col">
              <HeaderInfo
                selectedBucket={this.state.selectedBucket}
                bucketLocation={this.state.bucketLocation}
                isLoading={this.state.isLoading}
                autoAnalyze={this.state.autoAnalyze}
                totalSize={this.state.totalSize}
                totalFiles={this.state.totalFiles}
                onAutoAnalyzeChange={this.handleAutoAnalyzeChange}
              />
              <Tabs defaultActiveKey="1" type="card">
                <Tabs.TabPane tab="Browser" key="1">
                  {this.state.selectedBucket ? (
                    <>
                      <BrowserHeader>
                        <Search
                          activePrefix={this.state.activePrefix}
                          onSearchSubmit={this.handleSearchSubmit}
                        />
                        {/* <Delimiter
                          defaultValue={this.state.delimiter}
                          onDelimiterSubmit={this.state.onDelimiterSubmit}
                        /> */}
                        <Navigation
                          perPage={this.state.perPage}
                          isTruncated={this.state.isTruncated}
                          activePrefix={this.state.activePrefix}
                          // onPerPageChange={this.handlePerPageChange}
                          onLoadNext={this.handleLoadNext}
                          totalSize={this.state.totalSize}
                          totalFiles={this.state.totalFiles}
                        />
                      </BrowserHeader>
                      <ObjectTable
                        objects={this.state.objects}
                        loading={this.state.isLoading}
                        activePrefix={this.state.activePrefix}
                        selectedBucket={this.state.selectedBucket}
                        delimiter={this.state.delimiter}
                        onPrefixChange={this.handlePrefixChange}
                        perPage={this.state.perPage}
                        onDeleteObject={() => {}}
                      />
                    </>
                  ) : (
                    <Empty description="To browse files please select a Bucket from the left menu." />
                  )}
                </Tabs.TabPane>
                {/* <Tabs.TabPane disabled={!this.state.selectedBucket} tab="Bucket Info" key="2">
                  <BucketInfo />
                </Tabs.TabPane> */}
                <Tabs.TabPane disabled={!this.state.selectedBucket} tab="Analytics" key="3">
                  <Statistics
                    onAnalyzeSubmit={this.handleAnalyzeBucket}
                    totalSize={this.state.totalSize}
                    totalFiles={this.state.totalFiles}
                    smallest={this.state.smallest}
                    largest={this.state.largest}
                    autoAnalyze={this.state.autoAnalyze}
                  />
                </Tabs.TabPane>
              </Tabs>
            </div>
          </div>
        )}
      </Layout>
    )
  }
}
