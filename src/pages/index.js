import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import LsDisplay from "../components/LsDisplay"
import Header from "../components/header"
import MainComponent from "../components/MainComponent"
import DesktopIcons from "../components/DesktopIcons"

const IndexPage = () => (
  <>
    <Seo title="Yash Bhangale" />
    <Layout>
      <Header />
      <div className="container">
        <LsDisplay text="~ $ls -l" delay="natural"></LsDisplay>
      </div>
    </Layout>
    <MainComponent />
    <DesktopIcons />
  </>
)

export default IndexPage
