import Head from "../../node_modules/next/head";
import logoImg from "../../public/logo.svg";
import styles from "../../styles/home.module.scss";
import Image from "../../node_modules/next/image";
import { Input } from "../components/ui/Input/index";
import { Button } from "../components/ui/Button/index";
import Link from "../../node_modules/next/link";
import { AuthContext } from "../contexts/AuthContext";
import { FormEvent, useContext } from "react";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    let data = {
      email: "algum@teste.com",
      password: "123123",
    };

    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>Sujeito Pizza - faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="logo pizzaria" />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input placeholder="Insira o E-mail" type="text" />
            <Input placeholder="Insira a Senha" type="password" />
            <Button type="submit" loading={false}>
              Acessar
            </Button>
          </form>
          <Link href="/cadastro">
            <a className={styles.text}>Não possui uma conta ? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  );
}
