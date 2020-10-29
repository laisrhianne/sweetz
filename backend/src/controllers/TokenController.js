import jwt from 'jsonwebtoken';
import Cliente from '../models/Cliente';
import User from '../models/User';

class TokenController {
  async clienteStore(req, res) {
    try {
      const { email = '', senha = '' } = req.body;

      if (!email || !senha) {
        return res.status(401).json({
          errors: ['Credenciais inválidas'],
        });
      }

      const cliente = await Cliente.findOne({ where: { email } });

      if (!cliente) {
        return res.status(401).json({
          errors: ['Usuário não existe'],
        });
      }

      if (!(await cliente.validacaoSenha(senha))) {
        return res.status(401).json({
          errors: ['Senha incorreta'],
        });
      }

      const { id } = cliente;
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET_CLIENTE, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(400).json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async userStore(req, res) {
    try {
      const { email = '', senha = '' } = req.body;

      if (!email || !senha) {
        return res.status(401).json({
          errors: ['Credenciais inválidas'],
        });
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({
          errors: ['Usuário não existe'],
        });
      }

      if (!(await user.validacaoSenha(senha))) {
        return res.status(401).json({
          errors: ['Senha incorreta'],
        });
      }

      const { id } = user;
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET_CONFEITARIA, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(400).json({ errors: error.errors.map((err) => err.message) });
    }
  }
}

export default new TokenController();
