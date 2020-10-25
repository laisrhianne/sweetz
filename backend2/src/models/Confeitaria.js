import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

import appConfig from '../config/appConfig';

export default class Confeitaria extends Model {
  static init(sequelize) {
    super.init({
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já cadastrado',
        },
        validate: {
          isEmail: {
            msg: 'Email Inválido',
          },
        },
      },
      senha_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      senha: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'A senha deve ter entre 6 e 50 caracteres',
          },
        },
      },
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      cpf: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      nome_confeitaria: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      cnpj: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      telefone: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      rua: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      numero: {
        type: Sequelize.INTEGER,
        defaultValue: '',
      },
      complemento: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      bairro: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      cidade: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      estado: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      logo: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      logo_url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('logo')}`;
        },
      },
    }, {
      sequelize,
      tableName: 'confeitarias',
    });

    this.addHook('beforeSave', async (cliente) => {
      if (cliente.senha) {
        cliente.senha_hash = await bcryptjs.hash(cliente.senha, 10);
      }
    });
    return this;
  }

  validacaoSenha(senha) {
    return bcryptjs.compare(senha, this.senha_hash);
  }
}
