import { PrismaClient } from '@prisma/client'

const MUTATIONS = new Set(['create', 'update', 'delete', 'upsert', 'createMany', 'updateMany', 'deleteMany'])

function makePrisma() {
  return new PrismaClient({
    log: [{ level: 'error', emit: 'stdout' }, { level: 'warn', emit: 'stdout' }],
  }).$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          const t = Date.now()
          try {
            const result = await query(args)
            if (MUTATIONS.has(operation)) {
              console.log(`[db] ${model}.${operation} OK — ${Date.now() - t}ms`)
            }
            return result
          } catch (err) {
            console.error(`[db] ${model}.${operation} FAILED — ${Date.now() - t}ms`, err)
            throw err
          }
        },
      },
    },
  })
}

type ExtendedPrisma = ReturnType<typeof makePrisma>
const globalForPrisma = globalThis as unknown as { prisma: ExtendedPrisma }

export const prisma = globalForPrisma.prisma ?? makePrisma()
globalForPrisma.prisma = prisma
