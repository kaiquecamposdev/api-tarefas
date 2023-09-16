import fs from 'node:fs'
import { parse } from 'csv-parse'

const csvPath = new URL('table.csv', import.meta.url)
const stream = fs.createReadStream(csvPath)
const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2
})

if(csvPath) {
async function run() {
  const lineStream = stream.pipe(csvParse)

  for await (const line of lineStream) {
    const [title, description] = line

    await fetch('http://localhost:8888/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })
  }
}
run()
}