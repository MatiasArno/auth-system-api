import { Sequelize, Model, DataTypes } from 'sequelize';
import { POSTGRES_URL } from '../../constants';

const sequelize = new Sequelize(POSTGRES_URL);

export { Model, DataTypes };
export default sequelize;
