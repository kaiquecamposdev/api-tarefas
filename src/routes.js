import { randomUUID } from 'node:crypto';

const tasks = []

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      return res.writeHead(200).end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      const { title, description } = req.body

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: null,
        updated_at: null,
      }
      if(tasks.length >= 0) {
        tasks.push(task)
      }

      return res.writeHead(202).end("Tarefa adicionada!")
    }           
  },
  {
    method: 'PUT',    
    path: '/tasks/:id',
    handler: (req, res) => {
      return res.writeHead(202).end("Tarefa atualizada!")
    }
  },
  {
    method: 'PATCH',
    path: '/tasks/:id/complete',
    handler: (req, res) => {
      return res.writeHead(202).end("Tarefa concluída!")
    }
  },
  {
    method: 'DELETE',
    path: '/tasks/:id',
    handler: (req, res) => {
      return res.writeHead(204).end("Tarefa apagada!")
    }
  }
]