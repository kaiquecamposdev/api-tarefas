import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"
import { randomUUID } from "node:crypto"

const database = new Database()
const table = "json:tasks"

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select(table, search ? {
        title: search,
        description: search
      } : null)

      return res.writeHead(200).end(JSON.stringify(tasks))
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body 

      if (!title) {
        return res.writeHead(400).end(
          JSON.stringify({ error: 'title é requirido' }),
        )
      }
      if (!description) {
        return res.writeHead(400).end(
          JSON.stringify({ error: 'description é requirido' })
        )
      }

      database.insert(table, {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: null,
      })

      return res.writeHead(201).end()
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { title, description } = req.body
      const { id } = req.params

      if (!title || !description) {
        return res.writeHead(400).end(
          JSON.stringify({ error: 'title e description são requiridos' })
        )
      }

      const [task] = database.select(table, { id })

      if (!task) {
        return res.writeHead(404).end()
      }

      const { completed_at, created_at } = task

      database.update(table, id, {
        id,
        title,
        description,
        completed_at,
        created_at,
        updated_at: new Date(),
      })
      
      return res.writeHead(204).end()
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params

      const [task] = database.select(table, { id })

      if (!task) {
        return res.writeHead(404).end()
      }

      const { title, description, created_at, updated_at } = task      

      if(!task.completed_at) {
        database.update(table, id, {
          id,
          title,
          description,
          completed_at: new Date(),
          created_at,
          updated_at
         })
      }

      return res.writeHead(204).end()
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params

      const [task] = database.select(table, { id })

      if (!task) {
        return res.writeHead(404).end()
      }

      database.delete(table, id)

      return res.writeHead(204).end()
    },
  },
]
