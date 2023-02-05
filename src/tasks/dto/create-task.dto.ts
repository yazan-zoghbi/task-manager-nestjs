export class CreateTaskDto{
    name: string
    description: string
    date: Date
    projectID: string
    tags: string[]
}