import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../config/firebase';
import './new.css';
class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: '',
      image: null,
      url: '',
      descricao: '',
      alert: '',
    };
    this.cadastrar = this.cadastrar.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount() {
    if (!firebase.getCurrent()) {
      this.props.history.replace('/login');
      return null;
    }
  }

  handleUpload = async () => {
    const { image } = this.state;
    const uid = firebase.getCurrentUid();
    const uploadTask = firebase.storage
      .ref(`images/${uid}/${image.name}`)
      .put(image);

    await uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        this.setState({ progress });
      },
      (error) => {
        console.log('Erro: ' + error);
      },
      () => {
        firebase.storage
          .ref(`images/${uid}`)
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({ url: url });
          });
      },
    );
  };

  handleFile = async (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      if (image.type === 'image/png' || image.type === 'image/jpeg') {
        await this.setState({ image: image });
        this.handleUpload();
      } else {
        alert('Envie uma imagem do tipo PNG ou JPG');
        this.setState({ image: null });
        return null;
      }
    }
  };
  cadastrar = async (e) => {
    e.preventDefault();
    if (
      this.state.titulo !== '' &&
      this.state.imagem !== '' &&
      this.state.descricao !== '' &&
      this.state.image !== null &&
      this.state.url !== ''
    ) {
      let posts = firebase.app.ref('posts');
      let chave = posts.push().key;
      await posts.child(chave).set({
        titulo: this.state.titulo,
        image: this.state.url,
        descricao: this.state.descricao,
        autor: localStorage.nome,
        progress: 0,
      });

      this.props.history.push('/dashboard');
    } else {
      this.setState({ alert: 'Preencha todos os campos!' });
    }
  };
  render() {
    return (
      <div>
        <header id="new">
          <Link to="/dashboard">Voltar</Link>
        </header>
        <form onSubmit={this.cadastrar} id="new-post">
          <span>{this.state.alert}</span>
          <label>Titulo:</label>
          <input
            type="text"
            value={this.state.titulo}
            onChange={(e) => this.setState({ titulo: e.target.value })}
            autoFocus
          />

          <label>Descrição:</label>
          <textarea
            type="text"
            value={this.state.descricao}
            onChange={(e) => this.setState({ descricao: e.target.value })}
          />

          <label>Imagem:</label>
          <input type="file" onChange={this.handleFile} />
          {this.state.url !== '' ? (
            <img src={this.state.url} width="250" height="150" />
          ) : (
            <progress value={this.state.progress} max="100" />
          )}
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    );
  }
}
export default withRouter(New);
