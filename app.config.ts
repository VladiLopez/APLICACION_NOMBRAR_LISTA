import {ExpoConfig, ConfigContext } from 'expo/config'
import * as dotenv from 'dotenv'

dotenv.config()

export default ({ config }: ConfigContext): ExpoConfig => {
    return {
        ...config,
        slug: 'CheckInClass',
        name: 'CheckInClass',
        extra: {
            ...config.extra,
            supabaseUrl: process.env.Project_URL,
            supabaseAnonKey: process.env.Project_KEY
        }
    }
}