import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  document.title = `TAZAKHABAR - ${ capitalizeFirstletter(props.category) }`;

  const updateNews = async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${ props.country }&category=${ props.category }&apiKey=${ props.apiKey }&page=${ page }&pageSize=${ props.pageSize }`;
   
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);

    setArticles(parsedData.articles)
    setLoading(false)
    setTotalResults(parsedData.totalResults)

    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {
    setPage(page+1)
    let url = `https://newsapi.org/v2/top-headlines?country=${ props.country }&category=${ props.category }&apiKey=${ props.apiKey }&page=${ page+1 }&pageSize=${ props.pageSize }`;
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json()

    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  };

  return (
    <>
      <h1 className='text-center ' style={{ margin: '40px 0px', marginTop:'90px' }}>TAZAKHABAR - Top '{capitalizeFirstletter(props.category)}' Headlines</h1>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={loading && <Spinner />}
      >
        <div className="container">
          <div className="row my-2" >
            {articles.map((element) => {
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

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
  totalResults: 0
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News




//button functions - 
 // const handleNextClick = async (event) => {
  //   setPage(page+1)
  //   updateNews();
  // }

  // const handlePrevClick = async () => {
  //   setPage(page-1)
  //   updateNews();
  // }


//functions used and upgraded so made commenet...........use it for refernce for future-

//next and prev click function without upgradeNews function() - 
// handleNextClick = async (event) => {
//   console.log("next");
//   if(!(this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize))){
//     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=db6097f4eca04f7986e8d28b1778b379&page=${this.state.page+1}&pageSize=${props.pageSize}`;
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

//   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=db6097f4eca04f7986e8d28b1778b379&page=${this.state.page-1}&pageSize=${props.pageSize}`;
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
//   <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-warning" onClick={this.handleNextClick}>Next &rarr;</button>
// </div>
// }