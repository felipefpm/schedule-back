import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const firstHabitId = '846d0342-8efe-11ee-b9d1-0242ac120002'
const firstHabitCreationDate = new Date('2022-12-31T03:00:00.000')

const secondHabitId = '8bf43496-8efe-11ee-b9d1-0242ac120002'
const secondHabitCreationDate = new Date('2023-01-03T03:00:00.000')

const thirdHabitId = '9184e766-8efe-11ee-b9d1-0242ac120002'
const thirdHabitCreationDate = new Date('2023-01-08T03:00:00.000')

async function run() {
  await prisma.dayHabit.deleteMany()
  await prisma.habitWeekDays.deleteMany()
  await prisma.day.deleteMany()
  await prisma.habit.deleteMany()

  /**
   * Create habits
   */

  await Promise.all([
    prisma.habit.create({
      data: {
        id: firstHabitId,
        title: 'Beber 2L água',
        created_at: firstHabitCreationDate,
        weekDays: {
          create: [
            {week_day: 1},
            {week_day: 2},
            {week_day: 3},
          ]
        }
      }
    }),

    prisma.habit.create({
      data: {
        id: secondHabitId,
        title: 'Exercitar',
        created_at: secondHabitCreationDate,
        weekDays: {
          create: [
            {week_day: 3},
            {week_day: 4},
            {week_day: 5}
          ]
        }
      }
    }),

    prisma.habit.create({
      data: {
        id: thirdHabitId,
        title: 'Dormir 8h',
        created_at: thirdHabitCreationDate,
        weekDays: {
          create: [
            {week_day: 1},
            {week_day: 2},
            {week_day: 3},
            {week_day: 4},
            {week_day: 5}
          ]
        }
      }
    }),
  ])

  await Promise.all([
    /**
     * Habits (Complete/Availabel): 1/1
     */
    prisma.day.create({
      data: {
        /** Monday */
        date: new Date('2023-01-02T03:00:00.000z'),
        dayHabits: {
          create: {
            habit_id: firstHabitId
          }
        }
      }
    }),

    /**
     * Habits (Complete/Availabel): 1/1
     */
    prisma.day.create({
      data: {
        /** Friday */
        date: new Date('2023-01-06T03:00:00.000z'),
        dayHabits: {
          create: {
            habit_id: firstHabitId
          }
        }
      }
    }),

    /**
     * Habits (Complete/Availabel): 2/2
     */
    prisma.day.create({
      data: {
        /** Wenesday */
        date: new Date('2023-01-04T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: firstHabitId },
            { habit_id: secondHabitId },
          ]
        }
      }
    })
  ])

}

run().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})