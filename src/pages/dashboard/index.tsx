import Head from 'next/head';
import React from 'react';
import { canSSRAuth } from '../../utils/canSSRAuth';
import Header from '../../components/Header';
import styles from './styles.module.scss';

const Dashboard = () => {
	return (
		<>
			<Head>
				<title>Painel - Pizzaria</title>
			</Head>
			<Header />
			<div>
				<h1>Painel</h1>
			</div>
		</>
	);
};

export default Dashboard;

export const getServerSideProps = canSSRAuth(async (ctx) => {
	return {
		props: {},
	};
});
