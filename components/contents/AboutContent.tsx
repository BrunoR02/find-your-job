import Image from "next/image"
import Link from "next/link"
import styles from "./AboutContent.module.css"

export default function AboutContent(){
  return (
    <section className={styles.content}>
      <p className={styles.text}>
      <span className={styles.title}>Find your Job</span>
      {` é um projeto de site com o objetivo especial de ajudar as pessoas a encontrar empregos. Possui 
      implementações funcionais e completas, dentre elas:

        •	Integração das vagas com uma API pública de Jobs em GraphQL criando queries com Apollo Client. Juntando a 
        isso um sistema de filtro e pesquisa criado do zero, faz com que o site exiba apenas as informações que sejam 
        relevantes para o usuário particular, auxiliando-o na sua busca de emprego.

        •	Desenvolvi um sistema de autenticação usando TypeGraphQL e Apollo Server validando o usuário com o uso de 
        criptografia JWT, dando a ele segurança no acesso de sua conta como também na edição de dados do mesmo, uma 
        vez armazenados no MySQL hospedado pelo RDS (AWS) e as imagens no S3 (AWS).

        •	Uso do versionamento remoto com Git Flow na implementação de funcionalidades (features) e releases no 
        desenvolvimento, fazendo com que qualquer um possa ver o histórico e entender as mudanças feitas no projeto, 
        facilitando a identificação de cada uma delas.

        •	Desenvolvimento do projeto usando Typescript, auxiliando na construção dos códigos complexos como também 
        na produtividade.`}
      </p>
      <span className={styles.contact}>
        {`Bruno Lucas Ribeiro Santos
        brunolucas23@gmail.com
        +55 (79) 98818-8543`}
        <div className={styles.links}>
          <Link href="https://www.linkedin.com/in/bruno-ribeiro02/"><a className={styles.link} target="_blank"><Image src="https://find-your-job-files.s3.sa-east-1.amazonaws.com/icons/linkedin-icon.png" width="100%" height="100%"/></a></Link>
          <Link href="https://github.com/BrunoR02/find-your-job"><a className={styles.link} target="_blank"><Image src="https://find-your-job-files.s3.sa-east-1.amazonaws.com/icons/github-icon.png" width="100%" height="100%"/></a></Link>
        </div>
      </span>
    </section>
  )
}