-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 14-Ago-2024 às 09:45
-- Versão do servidor: 8.0.39-0ubuntu0.22.04.1
-- versão do PHP: 7.3.33-8+ubuntu22.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `empresa`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `empregados`
--

CREATE TABLE `empregados` (
  `id` int NOT NULL,
  `nome` varchar(155) NOT NULL,
  `salario` double NOT NULL,
  `departamento` enum('administrativo','designer', 'contabil', 'fabrica') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `empregados`
--

INSERT INTO `empregados` (`id`, `nome`, `salario`, `departamento`) VALUES
(1, 'Marcos', 4000, 'administrativo'),
(2, 'Odracir', 1500, 'designer'),
(3, 'Antônia', 3500, 'contabil');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `empregados`
--
ALTER TABLE `empregados`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `empregados`
--
ALTER TABLE `empregados`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
