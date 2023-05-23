import { Options } from 'sequelize'

export interface IDatabaseConfig extends Options {
  url?: string
}