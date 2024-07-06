import { useNavigation } from '@react-navigation/native'
import { FlatList, Heading, HStack, Text, useToast, VStack } from 'native-base'
import { useEffect, useState } from 'react'
import { AppError } from '@/utils/AppError'

import { ExerciseCard } from '@/components/ExerciseCard'
import { Group } from '@/components/Group'
import { HomeHeader } from '@/components/HomeHeader'
import { Loading } from '@/components/Loading'
import { ExerciseDTO } from '@/dtos/ExerciseDTO'
import { api } from '@/lib/axios'
import { AppNavigationRoutesProp } from '@/routes/app.routes'

export const Home = () => {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [groups, setGroups] = useState<string[]>([])
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])
  const [selectedGroup, setSelectedGroup] = useState('antebraço')

  const { navigate } = useNavigation<AppNavigationRoutesProp>()

  const handleOpenExerciseDetails = (id: string) => {
    navigate('exercise', { id })
  }

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await api.get('/groups')

        setGroups(response.data)
      } catch (error) {
        const isAppError = error instanceof AppError
        const title = isAppError
          ? error.message
          : 'Não foi possível carregar os grupos musculares.'

        toast.show({
          title,
          placement: 'bottom',
          marginBottom: '5',
          bgColor: 'red.500',
        })
      }
    }

    fetchGroups()
  }, [toast])

  useEffect(() => {
    const fetchExercisesByGroup = async () => {
      setIsLoading(true)
      try {
        const response = await api.get(`/exercises/bygroup/${selectedGroup}`)

        setExercises(response.data)
      } catch (error) {
        const isAppError = error instanceof AppError
        const title = isAppError
          ? error.message
          : 'Não foi possível carregar os grupos musculares.'

        toast.show({
          title,
          placement: 'bottom',
          marginBottom: '5',
          bgColor: 'red.500',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchExercisesByGroup()
  }, [selectedGroup, toast])

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              selectedGroup.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
            onPress={() => setSelectedGroup(item)}
          />
        )}
        _contentContainerStyle={{
          px: 8,
        }}
        my={10}
        maxH={10}
        // minH={10}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={8}>
          <HStack justifyContent={'space-between'} mb={5}>
            <Heading color={'gray.200'} fontSize={'md'}>
              Exercícios
            </Heading>

            <Text color={'gray.200'} fontSize={'sm'}>
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                onPress={() => handleOpenExerciseDetails(item.id)}
                data={item}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ pb: 20 }}
          />
        </VStack>
      )}
    </VStack>
  )
}
