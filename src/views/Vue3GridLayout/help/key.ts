import { type InjectionKey } from 'vue'
import { type Parameter } from '../types'
export const key = Symbol() as InjectionKey<Parameter> // 标注类型。
