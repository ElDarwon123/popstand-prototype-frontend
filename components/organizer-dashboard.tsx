"use client"

import { useState } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Avatar,
  Progress,
  Divider,
} from "@heroui/react"
import { Plus, Calendar, MapPin, Users, DollarSign, Eye, Edit, Trash2, Send, Clock } from "lucide-react"

interface Event {
  id: string
  name: string
  location: string
  date: string
  time: string
  description: string
  category: string
  maxAttendees: number
  currentAttendees: number
  price: number
  status: "draft" | "published" | "active" | "completed"
  applications: number
  revenue: number
}

interface Application {
  id: string
  eventId: string
  applicantName: string
  businessName: string
  category: string
  experience: string
  status: "pending" | "approved" | "rejected"
  appliedDate: string
  avatar: string
}

const mockEvents: Event[] = [
  {
    id: "1",
    name: "Feria Gastronómica Popayán",
    location: "Parque Caldas, Popayán",
    date: "2024-01-15",
    time: "08:00 - 18:00",
    description: "La mejor feria gastronómica de la ciudad",
    category: "Gastronomía",
    maxAttendees: 60,
    currentAttendees: 45,
    price: 25000,
    status: "active",
    applications: 12,
    revenue: 1125000,
  },
  {
    id: "2",
    name: "Mercado Artesanal Navideño",
    location: "Centro Comercial Campanario",
    date: "2024-01-20",
    time: "10:00 - 20:00",
    description: "Artesanías y productos navideños",
    category: "Artesanías",
    maxAttendees: 40,
    currentAttendees: 32,
    price: 30000,
    status: "published",
    applications: 8,
    revenue: 960000,
  },
]

const mockApplications: Application[] = [
  {
    id: "1",
    eventId: "1",
    applicantName: "María González",
    businessName: "Delicias Caseras",
    category: "Gastronomía",
    experience: "5 años de experiencia en ferias gastronómicas",
    status: "pending",
    appliedDate: "2024-01-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    eventId: "1",
    applicantName: "Carlos Rodríguez",
    businessName: "Café de Montaña",
    category: "Bebidas",
    experience: "Productor de café orgánico con 3 años de experiencia",
    status: "approved",
    appliedDate: "2024-01-08",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function OrganizerDashboard() {
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const [applications, setApplications] = useState<Application[]>(mockApplications)
  const [selectedTab, setSelectedTab] = useState("overview")
  const { isOpen: isEventModalOpen, onOpen: onEventModalOpen, onClose: onEventModalClose } = useDisclosure()
  const { isOpen: isAppModalOpen, onOpen: onAppModalOpen, onClose: onAppModalClose } = useDisclosure()
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)

  const [newEvent, setNewEvent] = useState({
    name: "",
    location: "",
    date: "",
    time: "",
    description: "",
    category: "",
    maxAttendees: "",
    price: "",
  })

  const categories = ["Gastronomía", "Artesanías", "Tecnología", "Moda", "Servicios"]

  const handleCreateEvent = () => {
    // Lógica para crear evento
    console.log("Crear evento:", newEvent)
    onEventModalClose()
    setNewEvent({
      name: "",
      location: "",
      date: "",
      time: "",
      description: "",
      category: "",
      maxAttendees: "",
      price: "",
    })
  }

  const handleApplicationAction = (applicationId: string, action: "approve" | "reject") => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, status: action === "approve" ? "approved" : "rejected" } : app,
      ),
    )
  }

  const totalRevenue = events.reduce((sum, event) => sum + event.revenue, 0)
  const totalEvents = events.length
  const totalAttendees = events.reduce((sum, event) => sum + event.currentAttendees, 0)
  const pendingApplications = applications.filter((app) => app.status === "pending").length

  const tabs = [
    { key: "overview", title: "Resumen" },
    { key: "events", title: "Mis Eventos" },
    { key: "applications", title: `Solicitudes (${pendingApplications})` },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Panel de Organizador</h1>
          <p className="text-default-600">Gestiona tus eventos y expositores</p>
        </div>
        <Button color="primary" startContent={<Plus className="w-4 h-4" />} onPress={onEventModalOpen}>
          Crear Evento
        </Button>
      </div>

      <div className="flex space-x-1 p-1 bg-default-100 rounded-lg w-fit">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            variant={selectedTab === tab.key ? "solid" : "light"}
            color={selectedTab === tab.key ? "primary" : "default"}
            size="sm"
            onPress={() => setSelectedTab(tab.key)}
          >
            {tab.title}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      {selectedTab === "overview" && (
        <div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardBody className="flex flex-row items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-default-600">Total Eventos</p>
                  <p className="text-2xl font-bold">{totalEvents}</p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="flex flex-row items-center space-x-4">
                <div className="p-3 bg-success/10 rounded-lg">
                  <DollarSign className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-default-600">Ingresos Totales</p>
                  <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="flex flex-row items-center space-x-4">
                <div className="p-3 bg-warning/10 rounded-lg">
                  <Users className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-default-600">Total Expositores</p>
                  <p className="text-2xl font-bold">{totalAttendees}</p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="flex flex-row items-center space-x-4">
                <div className="p-3 bg-danger/10 rounded-lg">
                  <Send className="w-6 h-6 text-danger" />
                </div>
                <div>
                  <p className="text-sm text-default-600">Solicitudes Pendientes</p>
                  <p className="text-2xl font-bold">{pendingApplications}</p>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Recent Events */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Eventos Recientes</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {events.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 border border-default-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{event.name}</h4>
                        <p className="text-sm text-default-600">{event.location}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-default-500">{event.date}</span>
                          <Chip size="sm" color={event.status === "active" ? "success" : "warning"}>
                            {event.status}
                          </Chip>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${event.revenue.toLocaleString()}</p>
                      <p className="text-sm text-default-600">
                        {event.currentAttendees}/{event.maxAttendees} expositores
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {selectedTab === "events" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{event.name}</h3>
                    <Chip size="sm" color={event.status === "active" ? "success" : "warning"}>
                      {event.status}
                    </Chip>
                  </div>
                  <div className="flex gap-1">
                    <Button isIconOnly size="sm" variant="light">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button isIconOnly size="sm" variant="light">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button isIconOnly size="sm" variant="light" color="danger">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="space-y-3">
                <div className="space-y-2 text-sm text-default-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                </div>

                <Divider />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Expositores</span>
                    <span>
                      {event.currentAttendees}/{event.maxAttendees}
                    </span>
                  </div>
                  <Progress value={(event.currentAttendees / event.maxAttendees) * 100} color="primary" size="sm" />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div>
                    <p className="text-sm text-default-600">Ingresos</p>
                    <p className="font-semibold text-success">${event.revenue.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-default-600">Solicitudes</p>
                    <p className="font-semibold">{event.applications}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {selectedTab === "applications" && (
        <div className="space-y-4">
          {applications.map((application) => (
            <Card key={application.id}>
              <CardBody>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar src={application.avatar} size="lg" />
                    <div>
                      <h4 className="font-semibold">{application.applicantName}</h4>
                      <p className="text-sm text-default-600">{application.businessName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Chip size="sm" color="primary">
                          {application.category}
                        </Chip>
                        <span className="text-xs text-default-500">
                          Aplicó el {new Date(application.appliedDate).toLocaleDateString("es-CO")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Chip
                      size="sm"
                      color={
                        application.status === "approved"
                          ? "success"
                          : application.status === "rejected"
                            ? "danger"
                            : "warning"
                      }
                    >
                      {application.status}
                    </Chip>
                    {application.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          color="success"
                          onPress={() => handleApplicationAction(application.id, "approve")}
                        >
                          Aprobar
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          variant="light"
                          onPress={() => handleApplicationAction(application.id, "reject")}
                        >
                          Rechazar
                        </Button>
                      </div>
                    )}
                    <Button
                      size="sm"
                      variant="light"
                      onPress={() => {
                        setSelectedApplication(application)
                        onAppModalOpen()
                      }}
                    >
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* Create Event Modal */}
      <Modal isOpen={isEventModalOpen} onClose={onEventModalClose} size="2xl">
        <ModalContent>
          <ModalHeader>
            <h2 className="text-xl font-bold">Crear Nuevo Evento</h2>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nombre del Evento"
                  placeholder="Ej: Feria Gastronómica"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-default-700">Categoría</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Chip
                        key={category}
                        color={newEvent.category === category ? "primary" : "default"}
                        variant={newEvent.category === category ? "solid" : "bordered"}
                        className="cursor-pointer"
                        onClick={() => setNewEvent({ ...newEvent, category })}
                      >
                        {category}
                      </Chip>
                    ))}
                  </div>
                  {newEvent.category && (
                    <Button
                      size="sm"
                      variant="light"
                      color="danger"
                      onClick={() => setNewEvent({ ...newEvent, category: "" })}
                    >
                      Limpiar selección
                    </Button>
                  )}
                </div>
              </div>

              <Input
                label="Ubicación"
                placeholder="Ej: Parque Caldas, Popayán"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="date"
                  label="Fecha"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
                <Input
                  label="Horario"
                  placeholder="Ej: 08:00 - 18:00"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                />
              </div>

              <Textarea
                label="Descripción"
                placeholder="Describe tu evento..."
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="number"
                  label="Máximo de Expositores"
                  placeholder="60"
                  value={newEvent.maxAttendees}
                  onChange={(e) => setNewEvent({ ...newEvent, maxAttendees: e.target.value })}
                />
                <Input
                  type="number"
                  label="Precio de Participación (COP)"
                  placeholder="25000"
                  value={newEvent.price}
                  onChange={(e) => setNewEvent({ ...newEvent, price: e.target.value })}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onEventModalClose}>
              Cancelar
            </Button>
            <Button color="primary" onPress={handleCreateEvent}>
              Crear Evento
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Application Detail Modal */}
      <Modal isOpen={isAppModalOpen} onClose={onAppModalClose} size="lg">
        <ModalContent>
          {selectedApplication && (
            <>
              <ModalHeader>
                <div className="flex items-center gap-3">
                  <Avatar src={selectedApplication.avatar} size="md" />
                  <div>
                    <h2 className="text-xl font-bold">{selectedApplication.applicantName}</h2>
                    <p className="text-default-600">{selectedApplication.businessName}</p>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Información del Negocio</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-default-600">Categoría:</span>
                        <Chip size="sm" color="primary">
                          {selectedApplication.category}
                        </Chip>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-default-600">Fecha de Aplicación:</span>
                        <span>{new Date(selectedApplication.appliedDate).toLocaleDateString("es-CO")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-default-600">Estado:</span>
                        <Chip
                          size="sm"
                          color={
                            selectedApplication.status === "approved"
                              ? "success"
                              : selectedApplication.status === "rejected"
                                ? "danger"
                                : "warning"
                          }
                        >
                          {selectedApplication.status}
                        </Chip>
                      </div>
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <h4 className="font-semibold mb-2">Experiencia</h4>
                    <p className="text-sm text-default-700">{selectedApplication.experience}</p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onAppModalClose}>
                  Cerrar
                </Button>
                {selectedApplication.status === "pending" && (
                  <>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={() => {
                        handleApplicationAction(selectedApplication.id, "reject")
                        onAppModalClose()
                      }}
                    >
                      Rechazar
                    </Button>
                    <Button
                      color="success"
                      onPress={() => {
                        handleApplicationAction(selectedApplication.id, "approve")
                        onAppModalClose()
                      }}
                    >
                      Aprobar
                    </Button>
                  </>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
