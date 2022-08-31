import Head from '../../../node_modules/next/head';
import logoImg from '../../../public/logo.svg';
import styles from '../../../styles/home.module.scss';
import Image from '../../../node_modules/next/image';
import { Input } from '../../components/ui/Input/index';
import { Button } from '../../components/ui/Button/index';
import Link from '../../../node_modules/next/link';
import React, { FormEvent, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';

export default function Cadastro() {
	const { signUp } = useContext(AuthContext);
	const [name, setName] = useState<string>();
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [loading, setLoading] = useState<boolean>(false);

	async function handleSignUP(event: FormEvent) {
		event.preventDefault();

		if (name === '' || email === '' || password === '') {
			toast.error('Preencha os campos');
			return;
		}

		setLoading(true);

		await signUp({ name, email, password });

		setLoading(false);
	}

	return (
		<>
			<Head>
				<title>Sujeito Pizza - Cadastre-se</title>
			</Head>
			<div className={styles.containerCenter}>
				<Image
					src={logoImg}
					alt="logo pizzaria"
				/>
				<div className={styles.login}>
					<h1>Criando sua conta</h1>
					<form onSubmit={handleSignUP}>
						<Input
							placeholder="Insira seu nome"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<Input
							placeholder="Insira seu E-mail"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							placeholder="Insira sua Senha"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button
							type="submit"
							loading={loading}>
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
