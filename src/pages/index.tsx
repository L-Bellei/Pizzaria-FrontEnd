import Head from '../../node_modules/next/head';
import logoImg from '../../public/logo.svg';
import styles from '../../styles/home.module.scss';
import Image from '../../node_modules/next/image';
import { Input } from '../components/ui/Input/index';
import { Button } from '../components/ui/Button/index';
import Link from '../../node_modules/next/link';
import { AuthContext } from '../contexts/AuthContext';
import { FormEvent, useContext } from 'react';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { canSSRGuest } from '../utils/canSSRGuest';

export default function Home() {
	const { signIn } = useContext(AuthContext);
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [loading, setLoading] = useState<boolean>(false);

	async function handleLogin(event: FormEvent) {
		event.preventDefault();

		if (email === '' || password === '') {
			toast.error('Preencha os campos ');
			return;
		}

		let data = {
			email,
			password,
		};

		setLoading(true);

		await signIn(data);

		setLoading(false);
	}

	return (
		<>
			<Head>
				<title>Sujeito Pizza - faça seu login</title>
			</Head>
			<div className={styles.containerCenter}>
				<Image
					src={logoImg}
					alt="logo pizzaria"
				/>
				<div className={styles.login}>
					<form onSubmit={handleLogin}>
						<Input
							placeholder="Insira o E-mail"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							placeholder="Insira a Senha"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button
							type="submit"
							loading={loading}>
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

export const getServerSideProps = canSSRGuest(async (ctx) => {
	return {
		props: {},
	};
});
