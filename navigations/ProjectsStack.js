import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Projects from '../screens/projects/Projects'
import AddProject from '../screens/projects/AddProject'
import Project from '../screens/projects/Project'
import Contracting from '../screens/projects/areas/Contracting'
import Infraestructure from '../screens/projects/areas/Infrastructure'
import Technology from '../screens/projects/areas/Technology'
import HumanTalent from '../screens/projects/areas/HumanTalent'
import AdministrativeServices from '../screens/projects/areas/AdministrativeServices'

const Stack = createStackNavigator()

export default function ProjectsStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="projects"
          component={Projects}
          options={{ title: "Proyectos" }}
        />
        <Stack.Screen
          name="add-project"
          component={AddProject}
          options={{ title: "Crear Proyecto" }}
        />
        <Stack.Screen
          name="project"
          component={Project}
        />
        <Stack.Screen
          name="Contratación"
          component={Contracting}
        />
        <Stack.Screen
          name="Infraestructura"
          component={Infraestructure}
        />
        <Stack.Screen
          name="Tecnología"
          component={Technology}
        />
        <Stack.Screen
          name="Talento Humano"
          component={HumanTalent}
        />
        <Stack.Screen
          name="Servicios Administrativos"
          component={AdministrativeServices}
        />
    </Stack.Navigator>
  );
}