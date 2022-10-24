import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h4>Desenvolvido por <span>Marcelo Cruz</span></h4>
      <p>uDockers &copy; 2022</p>
    </footer>
  )
}

export default Footer