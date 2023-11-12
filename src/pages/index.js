import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import LsDisplay from "../components/LsDisplay"
import Header from "../components/header"
import MainComponent from "../components/MainComponent"
import DesktopIcons from "../components/DesktopIcons"
import Loading from "../components/Loading"  // Import the Loading component

const IndexPage = () => (
  <>
    <Loading>
      <Seo title="Yash Bhangale" />
        <Header />
      <Layout>
      <div className="container">
        {/* Wrap the LsDisplay component with Loading */}
        <LsDisplay text="~ $ls -l" delay="natural"></LsDisplay>
      </div>
      </Layout>
      <DesktopIcons />
      <MainComponent />
    </Loading>
  </>
)

export default IndexPage
