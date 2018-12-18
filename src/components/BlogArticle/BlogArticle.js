import React, { Component } from 'react'

import './BlogArticle.css'
import { articles } from '../../containers/Blog/Blog.data'

class BlogArticle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      article: null,
    }
  }

  componentDidMount = () => {
    for (const article of articles) {
      if (article.url === this.props.match.params.id) {
        this.setState({ article: article })
      }
    }
  }

  render() {
    const { article } = this.state
    const { match, history } = this.props

    return (
      <section className="main__section">
        { match.path === '/blog/:id' &&
          <button
            className="button button--decent"
            onClick={() => history.goBack()}
          >
            Zurück
          </button>
        }
        { article &&
          <article>
            <p className="blog-article__date">{article.date}</p>
            <h1>{article.title}</h1>
            <p dangerouslySetInnerHTML={{ __html: article.content }}></p>
          </article>
        }
      </section>
    )
  }
}

export default BlogArticle