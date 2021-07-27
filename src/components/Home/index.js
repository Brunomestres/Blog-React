import React, { Component } from 'react';
import firebase from '../../config/firebase';
import './home.css';
class Home extends Component {
  state = {
    posts: [],
  };
  componentDidMount() {
    firebase.app.ref('posts').once('value', (snapshot) => {
      let state = this.state;
      state.posts = [];
      snapshot.forEach((childItem) => {
        state.posts.push({
          key: childItem.key,
          titulo: childItem.val().titulo,
          image: childItem.val().image,
          descricao: childItem.val().descricao,
          autor: childItem.val().autor,
        });
      });
      this.setState(state);
      console.log(state);
    });
  }
  render() {
    return (
      <section id="post">
        {this.state.posts.map((post) => {
          return (
            <article key={post.key}>
              <header>
                <div className="title">
                  <strong>{post.titulo}</strong>
                  <span>{post.autor}</span>
                </div>
              </header>
              <img src={post.image} />
              <footer>
                <p>{post.descricao}</p>
              </footer>
            </article>
          );
        })}
      </section>
    );
  }
}

export default Home;
