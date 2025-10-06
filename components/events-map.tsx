"use client"

import { useState } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Avatar,
  Divider,
} from "@heroui/react"
import { MapPin, Calendar, Clock, Users, Search, Star } from "lucide-react"

interface Event {
  id: string
  name: string
  location: string
  date: string
  time: string
  description: string
  category: string
  attendees: number
  maxAttendees: number
  price: number
  organizer: {
    name: string
    avatar: string
    rating: number
  }
  image: string
  coordinates: { lat: number; lng: number }
}

const mockEvents: Event[] = [
  {
    id: "1",
    name: "Feria Gastronómica Popayán",
    location: "Parque Caldas, Popayán",
    date: "2024-01-15",
    time: "08:00 - 18:00",
    description: "La mejor feria gastronómica de la ciudad con emprendedores locales",
    category: "Gastronomía",
    attendees: 45,
    maxAttendees: 60,
    price: 25000,
    organizer: {
      name: "Alcaldía de Popayán",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
    image: "/placeholder.svg?height=200&width=300",
    coordinates: { lat: 2.4448, lng: -76.6147 },
  },
  {
    id: "2",
    name: "Mercado Artesanal Navideño",
    location: "Centro Comercial Campanario",
    date: "2024-01-20",
    time: "10:00 - 20:00",
    description: "Artesanías y productos navideños de emprendedores locales",
    category: "Artesanías",
    attendees: 32,
    maxAttendees: 40,
    price: 30000,
    organizer: {
      name: "Cámara de Comercio",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
    },
    image: "/placeholder.svg?height=200&width=300",
    coordinates: { lat: 2.4521, lng: -76.6089 },
  },
]

export function EventsMap() {
  const [events] = useState<Event[]>(mockEvents)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()

  const categories = ["Gastronomía", "Artesanías", "Tecnología", "Moda", "Servicios"]

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    onOpen()
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Mapa de Ferias y Eventos</h1>
        <p className="text-default-600">Descubre eventos cerca de ti y conecta con emprendedores locales</p>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Buscar eventos o ubicaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={<Search className="w-4 h-4 text-default-400" />}
              className="flex-1"
            />

            <div className="md:w-48">
              <div className="flex flex-wrap gap-2 mb-2">
                {categories.map((category) => (
                  <Chip
                    key={category}
                    color={selectedCategory === category ? "primary" : "default"}
                    variant={selectedCategory === category ? "solid" : "bordered"}
                    className="cursor-pointer"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </Chip>
                ))}
              </div>
              {selectedCategory && (
                <Button size="sm" variant="light" color="danger" onClick={() => setSelectedCategory("")}>
                  Limpiar filtro
                </Button>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Map Placeholder */}
      <Card>
        <CardBody className="p-0">
          <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 flex items-center justify-center relative overflow-hidden">
            <div className="text-center space-y-2">
              <MapPin className="w-12 h-12 text-blue-500 mx-auto" />
              <p className="text-lg font-semibold">Mapa Interactivo</p>
              <p className="text-default-600">Visualización de eventos en Popayán</p>
            </div>

            {/* Mock map pins */}
            <div className="absolute top-20 left-32">
              <Button
                isIconOnly
                color="primary"
                variant="solid"
                size="sm"
                onClick={() => handleEventClick(mockEvents[0])}
              >
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
            <div className="absolute bottom-24 right-28">
              <Button
                isIconOnly
                color="secondary"
                variant="solid"
                size="sm"
                onClick={() => handleEventClick(mockEvents[1])}
              >
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} isPressable onPress={() => handleEventClick(event)}>
            <CardHeader className="pb-0">
              <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg flex items-center justify-center">
                <Calendar className="w-12 h-12 text-purple-500" />
              </div>
            </CardHeader>
            <CardBody className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{event.name}</h3>
                  <Chip color="primary" size="sm">
                    {event.category}
                  </Chip>
                </div>

                <div className="space-y-1 text-sm text-default-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(event.date).toLocaleDateString("es-CO")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>
                      {event.attendees}/{event.maxAttendees} expositores
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Avatar src={event.organizer.avatar} size="sm" />
                    <div className="text-sm">
                      <p className="font-medium">{event.organizer.name}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-default-600">{event.organizer.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-default-600">Desde</p>
                    <p className="font-semibold text-success">${event.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Event Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          {selectedEvent && (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-xl font-bold">{selectedEvent.name}</h2>
                <Chip color="primary" size="sm">
                  {selectedEvent.category}
                </Chip>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg flex items-center justify-center">
                    <Calendar className="w-16 h-16 text-purple-500" />
                  </div>

                  <div className="space-y-3">
                    <p className="text-default-700">{selectedEvent.description}</p>

                    <Divider />

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-default-400" />
                        <span>{selectedEvent.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-default-400" />
                        <span>{new Date(selectedEvent.date).toLocaleDateString("es-CO")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-default-400" />
                        <span>{selectedEvent.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-default-400" />
                        <span>
                          {selectedEvent.attendees}/{selectedEvent.maxAttendees} expositores
                        </span>
                      </div>
                    </div>

                    <Divider />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar src={selectedEvent.organizer.avatar} size="md" />
                        <div>
                          <p className="font-medium">{selectedEvent.organizer.name}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-default-600">{selectedEvent.organizer.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-default-600">Costo de participación</p>
                        <p className="text-xl font-bold text-success">${selectedEvent.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary">Solicitar Participación</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
