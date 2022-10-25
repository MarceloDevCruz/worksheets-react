// imports de css
import styles from './About.module.css'

const About = () => {
  return (
    <div className={styles.about}>
      <h1> Sobre o projeto</h1>
      <p>Projeto em react onde usei CRUD, "Create, Read, Update e Delete", uma pequena aplicação de criação de Worksheets utilizando a biblioteca React e suas bases (React Router, Hooks e custom hooks, context) e também banco de dados em cloud Firebase do google, além de fazer autenticação de novos usuários, para esse projeto usei uma estrutura de páginas separadas em public e src, onde fiz da forma de como se encontra no mercado de trabalho, criando pastas separadas para cada contexto de utilização Além disso, fiz todo o projeto estruturando o código em inglês que também é uma abordagem feita no mercado de trabalho atualmente, também o projeto está responsivo para todas as telas utilizadas hoje em dia, além de um design minimalista e criativo.
        Nesse projeto foi utilizado, html, css, javascript, es6, React, React router, context, Firebase, CRUD.</p>
    </div>
  )
}

export default About