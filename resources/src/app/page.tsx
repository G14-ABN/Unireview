'use client'
import { Search } from './landing/search/search'
import {Pages} from './landing/menu/menu'
import { Interfaccia } from './landing/interfaccia/interfaccia'
import { Lingua } from './landing/interfaccia/lingua'
import { Tema } from './landing/interfaccia/tema'
import { Landing } from './landing/landing'

export default function Home() {
  return (
    <body>
      {Landing()}
    </body>
  )
}
