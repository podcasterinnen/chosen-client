import React, { Component } from 'react'
import { withRouter, Link, Switch, Route } from 'react-router-dom'

import './Blog.css'
import iconArrow from '../../assets/icons/baseline_expand_more_black_48dp.png'
import { articles } from './Blog.data'
import BlogArticle from '../../components/BlogArticle/BlogArticle'

class Blog extends Component {

  componentDidMount = () => {
    document.title = 'Blog – podcasterinnen.org'
  }

  render() {
    const { match } = this.props

    return (
      <Switch>
        <Route
          path={`${match.path}/:id`}
          component={BlogArticle}
        ></Route>
        <Route
          exact
          props={match.path}
          render={() => (
            <section className="main__section">
              <h1>Blog</h1>
              <ul className="blog__list">
                { articles.map((article) => (
                <li key={article.id}>
                  <Link className="blog__link" to={`blog/${article.url}`}>
                    <span className="blog__icon">
                      <img alt="Icon of an arrow." src={iconArrow}></img>
                    </span>
                    <h3 className="blog__link__title">{article.date} · {article.title}</h3>
                  </Link>
                </li>
                ))}
              </ul>
            </section>
          )}
        ></Route>
      </Switch>
    )
  }
}

export default withRouter(Blog)
