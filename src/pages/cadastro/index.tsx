import Head from "../../../node_modules/next/head";
import logoImg from "../../../public/logo.svg";
import styles from "../../../styles/home.module.scss";
import Image from "../../../node_modules/next/image";
import { Input } from "../../components/ui/Input/index";
import { Button } from "../../components/ui/Button/index";
import Link from "../../../node_modules/next/link";
import React from "react";

export default function Cadastro() {
  return (
    <>
      <Head>
        <title>Sujeito Pizza - Cadastre-se</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="logo pizzaria" />
        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form>
            <Input placeholder="Insira seu nome" type="text" />
            <Input placeholder="Insira seu E-mail" type="text" />
            <Input placeholder="Insira sua Senha" type="password" />
            <Button type="submit" loading={false}>
              Cadastrar
            </Button>
          </form>
          <Link href="/">
            <a className={styles.text}>Já possui uma conta ? Faça Login!</a>
          </Link>
        </div>
      </div>
    </>
  );
}
