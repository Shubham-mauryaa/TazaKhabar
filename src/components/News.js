import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


export default class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
    totalResults: 0
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
    document.title = `TAZAKHABAR - ${ this.capitalizeFirstletter(this.props.category) }`;
  }

  async updateNews(pageNo) {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${ this.props.country }&category=${ this.props.category }&apiKey=${this.props.apiKey}&page=${ this.state.page }&pageSize=${ this.props.pageSize }`;
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async (event) => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 })
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    // this.updateNews();
    let url = `https://newsapi.org/v2/top-headlines?country=${ this.props.country }&category=${ this.props.category }&apiKey=${this.props.apiKey}&page=${ this.state.page }&pageSize=${ this.props.pageSize }`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    })
  };

  render() {
    return (
      <>
        <h1 className='text-center ' style={{ margin: '40px 0px' }}>TAZAKHABAR - Top '{this.capitalizeFirstletter(this.props.category)}' Headlines</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading && <Spinner />}
        >
          <div className="container">
            <div className="row my-2" >
              {this.state.articles.map((element) => {
                return <div className="col-md-4 my-4" key={element.url}>
                  <Newsitem title={element.title !== null ? element.title.slice(0, 20) : ""} description={element.description !== null ? element.description.slice(0, 100) : ""} imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
  }
}













//functions used and upgraded so made commenet...........use it for refernce for future-

//next and prev click function without upgradeNews function() - 
// handleNextClick = async (event) => {
//   console.log("next");
//   if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=db6097f4eca04f7986e8d28b1778b379&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
//     this.setState({loading:true})
//     let data = await fetch(url);
//     let parsedData = await data.json()
//     this.setState({
//       page :this.state.page+1,
//       articles:parsedData.articles,
//       loading:false
//     })
//   }
//   this.setState({ page: this.state.page + 1 });
//   this.updateNews();
// }
// handlePrevClick = async () => {
//   console.log("previous")

//   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=db6097f4eca04f7986e8d28b1778b379&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
//   this.setState({loading:true})
//   let data = await fetch(url);
//   let parsedData = await data.json()

//   this.setState({
//     page :this.state.page-1,
//     articles:parsedData.articles,
//     loading:false
//   })
//   this.setState({ page: this.state.page - 1 })
//   this.updateNews();
// }


//next and prev buttons
// {
//   <div className="container d-flex justify-content-between">
//   <button disabled={this.state.page <= 1 ? true : false} type="button" className="btn btn-warning" onClick={this.handlePrevClick}>&larr; Previous</button>
//   <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-warning" onClick={this.handleNextClick}>Next &rarr;</button>
// </div>
// }