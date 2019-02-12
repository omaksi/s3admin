// @ts-check

/**
 *
 * @param {{children: any}} props
 */

const Layout = ({ children }) => (
  <div id="layout">
    <style jsx global>{`
      html,
      body {
        margin: 0;
        padding: 0;
      }

      a {
        color: #4a90e2;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      .hidden {
        display: none;
      }
    `}</style>

    <style jsx>{`
      #layout {
        display: flex;
        flex-direction: column;
      }
      #content {
        /* margin-top: 20px; */
        width: 100%;
      }
    `}</style>

    <div id="content">{children}</div>
  </div>
)

export default Layout
