import './App.css';
import React from 'react';

const OPTIONS = ["Majuscule", "Minuscule", "Chiffre", "Symbole"];

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div className="form-check">
    <label>
      <input type="checkbox" name={ label } checked={ isSelected } onChange={ onCheckboxChange } className=""/>
      {label}
    </label>
  </div>
);

class Generateur extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      taille: 5,
      password: "",
      checkboxes: OPTIONS.reduce(
        (options, option) => ({
          ...options,
          [option]: false
        }), {}
      )
    };
  }

  handleTailleChange = e => {
    this.setState({ taille: e.target.value })
  }
  
  handleCheckboxChange = (e) => {
    const { name } = e.target;
    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  }

  handleFormSubmit = e => {
    e.preventDefault();
    this.setState({ password: this.generatePassword() });
  }

  generatePassword = () => {
    const alphabetMajuscule = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabetMinuscule = "abcdefghijklmnopqrstuvwxyz";
    const chiffres = "0123456789";
    const symboles = "&(§!)-_,?;.:/=+$*€@";
    var caracteres = "";
    var password = "";
    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        switch(checkbox) {
          case "Majuscule":
            caracteres += alphabetMajuscule;
            break;
          case "Minuscule":
            caracteres += alphabetMinuscule;
            break;
          case "Chiffre":
            caracteres += chiffres;
            break;
          case "Symbole":
            caracteres += symboles;
            break;
          default:
            break;
        }
    });
    for(var i = 0; i < this.state.taille; i++) {
      password += caracteres.charAt(Math.floor(Math.random() * (caracteres.length - 1)));
    }
    return password;
  }

  createCheckbox = option => (
    <Checkbox label={ option } isSelected={ this.state.checkboxes[option] } onCheckboxChange={ this.handleCheckboxChange } key={ option }/>
  );

  render() {
    return <div className="background">
      <div className="container">
        <div className="screen">
          <div className="screen-header">
            <div className="screen-header-left">
              <div className="screen-header-button close"></div>
              <div className="screen-header-button maximize"></div>
              <div className="screen-header-button minimize"></div>
            </div>
            <div className="screen-header-right">
              <div className="screen-header-ellipsis"></div>
              <div className="screen-header-ellipsis"></div>
              <div className="screen-header-ellipsis"></div>
            </div>
          </div>
          <div className="screen-body">
            <div className="screen-body-item">
              <form onSubmit={ this.handleFormSubmit } className="app-form">
                <p>Générateur de mot de passe</p>
                <div className="app-form-group">
                  <input type="number" id="taille" className="app-form-control" value={ this.state.taille } onChange={ this.handleTailleChange }/>
                </div>
                { OPTIONS.map(this.createCheckbox) }
                <div className="app-form-group buttons">
                  <button type="submit" className="app-form-button">Générer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <p className="password">{ this.state.password }</p>
      </div>
    </div>
  }

}

function App() {
  return (
    <div className="App">
      <Generateur/>
    </div>
  );
}

export default App;
