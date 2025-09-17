import React, { useState, useEffect, useMemo } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend
} from 'recharts';

// Definiciones del framework
const levels = [
  { id: 1, name: "Nivel 1: Lucha por la Supervivencia" },
  { id: 2, name: "Nivel 2: Estabilidad y Consistencia" },
  { id: 3, name: "Nivel 3: Reconocimiento y Adaptación" },
  { id: 4, name: "Nivel 4: Crecimiento y Autorrealización" },
  { id: 5, name: "Nivel 5: Trascendencia y Propósito Superior" },
];

const framework = {
  ser: {
    name: "El Ser",
    components: {
      propositoCultura: {
        name: "Propósito y Cultura",
        elements: [
          { id: 'vm', name: "Visión y Misión" },
          { id: 'vc', name: "Valores y Cultura" },
          { id: 'cc', name: "Compromiso de los Colaboradores" },
          { id: 'trc', name: "Transparencia y Rendición de Cuentas" },
        ]
      },
      gobernanzaLiderazgo: {
        name: "Gobernanza y Liderazgo",
        elements: [
          { id: 'go', name: "Gobierno Corporativo" },
          { id: 'li', name: "Liderazgo y Habilidades" },
          { id: 'ca', name: "Cadena de Mando" },
        ]
      },
      gestionTalento: {
        name: "Gestión del Talento",
        elements: [
          { id: 'pe', name: "Políticas de Empleados" },
          { id: 'cpd', name: "Crecimiento Profesional y Desarrollo" },
          { id: 'rc', name: "Reclutamiento y Contratación" },
        ]
      }
    }
  },
  forma: {
    name: "La Forma",
    components: {
      ofertaValor: {
        name: "Oferta de Valor",
        elements: [
          { id: 'pv', name: "Propuesta de Valor" },
          { id: 'ps', name: "Productos y Servicios" },
          { id: 'cd', name: "Canales de Distribución" },
          { id: 'co', name: "Capacidades Organizacionales" },
        ]
      },
      ecosistemaOperativo: {
        name: "Ecosistema Operativo",
        elements: [
          { id: 'roe', name: "Relacionamiento con el Ecosistema Operativo" },
          { id: 'es', name: "Experiencia de los Stakeholders" },
          { id: 'ep', name: "Estandarización de Procesos" },
          { id: 'mfv', name: "Mapeo de Flujo de Valor" },
        ]
      },
      gestionOperacional: {
        name: "Gestión Operacional",
        elements: [
          { id: 'kpis', name: "Indicadores de Desempeño (KPIs)" },
          { id: 'io', name: "Innovación en la Oferta" },
          { id: 'ap', name: "Automatización de Procesos" },
          { id: 'gd', name: "Gobierno de Datos" },
        ]
      }
    }
  },
  entorno: {
    name: "El Entorno",
    components: {
      informacionInteligencia: {
        name: "Información e Inteligencia",
        elements: [
          { id: 'ir', name: "Inventario de Recursos" },
          { id: 'inc', name: "Inteligencia de Negocio y Comunicación Externa" },
          { id: 'im', name: "Inteligencia de Mercado" },
          { id: 'as', name: "Análisis de Stakeholders" },
          { id: 'is', name: "Inteligencia Social" },
        ]
      },
      recursosAsociaciones: {
        name: "Recursos y Asociaciones",
        elements: [
          { id: 'ra', name: "Relacionamiento con las Asociaciones" },
          { id: 'rs', name: "Relacionamiento con los Socios" },
          { id: 'pc', name: "Participación Comunitaria" },
        ]
      },
      gestionRiesgo: {
        name: "Gestión del Riesgo y Cumplimiento",
        elements: [
          { id: 'gr', name: "Gestión de Riesgo" },
          { id: 'pl', name: "Planificación Legal y Cumplimiento" },
          { id: 'sc', name: "Seguridad Cibernética" },
        ]
      }
    }
  }
};

// Tabla de pesos para cada elemento por nivel.
const elementWeights = {
  1: {
    vm: 0.1, vc: 0.1, cc: 0.1, trc: 0.1, go: 0.1, li: 0.1, ca: 0.1, pe: 0.1, cpd: 0.1, rc: 0.1,
    pv: 0.1, ps: 0.1, cd: 0.1, co: 0.1, roe: 0.1, es: 0.1, ep: 0.1, mfv: 0.1, kpis: 0.1, io: 0.1,
    ap: 0.1, gd: 0.1, ir: 0.1, inc: 0.1, im: 0.1, as: 0.1, is: 0.1, ra: 0.1, rs: 0.1, pc: 0.1,
    gr: 0.1, pl: 0.1, sc: 0.1,
  },
  2: {
    vm: 0.15, vc: 0.15, cc: 0.15, trc: 0.15, go: 0.15, li: 0.15, ca: 0.15, pe: 0.15, cpd: 0.15, rc: 0.15,
    pv: 0.15, ps: 0.15, cd: 0.15, co: 0.15, roe: 0.15, es: 0.15, ep: 0.15, mfv: 0.15, kpis: 0.15, io: 0.15,
    ap: 0.15, gd: 0.15, ir: 0.15, inc: 0.15, im: 0.15, as: 0.15, is: 0.15, ra: 0.15, rs: 0.15, pc: 0.15,
    gr: 0.15, pl: 0.15, sc: 0.15,
  },
  3: {
    vm: 0.2, vc: 0.2, cc: 0.2, trc: 0.2, go: 0.2, li: 0.2, ca: 0.2, pe: 0.2, cpd: 0.2, rc: 0.2,
    pv: 0.2, ps: 0.2, cd: 0.2, co: 0.2, roe: 0.2, es: 0.2, ep: 0.2, mfv: 0.2, kpis: 0.2, io: 0.2,
    ap: 0.2, gd: 0.2, ir: 0.2, inc: 0.2, im: 0.2, as: 0.2, is: 0.2, ra: 0.2, rs: 0.2, pc: 0.2,
    gr: 0.2, pl: 0.2, sc: 0.2,
  },
  4: {
    vm: 0.25, vc: 0.25, cc: 0.25, trc: 0.25, go: 0.25, li: 0.25, ca: 0.25, pe: 0.25, cpd: 0.25, rc: 0.25,
    pv: 0.25, ps: 0.25, cd: 0.25, co: 0.25, roe: 0.25, es: 0.25, ep: 0.25, mfv: 0.25, kpis: 0.25, io: 0.25,
    ap: 0.25, gd: 0.25, ir: 0.25, inc: 0.25, im: 0.25, as: 0.25, is: 0.25, ra: 0.25, rs: 0.25, pc: 0.25,
    gr: 0.25, pl: 0.25, sc: 0.25,
  },
  5: {
    vm: 0.3, vc: 0.3, cc: 0.3, trc: 0.3, go: 0.3, li: 0.3, ca: 0.3, pe: 0.3, cpd: 0.3, rc: 0.3,
    pv: 0.3, ps: 0.3, cd: 0.3, co: 0.3, roe: 0.3, es: 0.3, ep: 0.3, mfv: 0.3, kpis: 0.3, io: 0.3,
    ap: 0.3, gd: 0.3, ir: 0.3, inc: 0.3, im: 0.3, as: 0.3, is: 0.3, ra: 0.3, rs: 0.3, pc: 0.3,
    gr: 0.3, pl: 0.3, sc: 0.3,
  }
};

const descriptions = {
  vm: {
    1: "Visión y Misión están ausentes o son informales, se conocen superficialmente y no son un motor para la organización.",
    2: "Visión y Misión están definidos, pero no son utilizados como una guía para la toma de decisiones. No son el motor de la organización.",
    3: "Visión y Misión están definidos y son ampliamente difundidos en la organización. Sirven como un marco de referencia.",
    4: "Visión y Misión están definidos y son un motor para la organización y sus miembros. Se revisan periódicamente y son coherentes con las actividades diarias.",
    5: "Visión y Misión son el ADN de la organización, están totalmente incorporados a su forma de operar. Son el foco de la evolución, el crecimiento y el propósito superior.",
  },
  vc: {
    1: "Los valores están ausentes o son declarativos sin un significado real. La cultura de la empresa se basa en comportamientos y dinámicas informales.",
    2: "Los valores están definidos pero son incoherentes con las acciones de la organización. La cultura es inconsistente.",
    3: "Los valores son coherentes con las acciones de la organización. Los valores están definidos y se fomentan, pero no son la base de la cultura de la organización.",
    4: "Los valores están totalmente incorporados y son una base sólida de la cultura de la organización. Son un motor de comportamiento para los miembros de la empresa.",
    5: "Los valores son la brújula de la organización, están totalmente integrados en su ADN. La cultura de la empresa es su activo principal para la evolución y el crecimiento.",
  },
  cc: {
    1: "Los empleados no tienen sentido de pertenencia. El ambiente laboral es poco motivador y el compromiso con la organización es bajo.",
    2: "Los empleados tienen algún sentido de pertenencia, pero no están comprometidos con los objetivos de la organización. El ambiente de trabajo es pasivo.",
    3: "Los empleados están comprometidos con los objetivos y la cultura de la empresa. La motivación no es una prioridad.",
    4: "Los empleados tienen un fuerte sentido de pertenencia y están comprometidos con los objetivos de la empresa. Son promotores de la cultura de la organización.",
    5: "Los empleados son los principales promotores de la visión, misión y valores de la empresa. El ambiente laboral es inspirador y la empresa es un 'imán de talento'.",
  },
  trc: {
    1: "La información es confidencial y solo accesible para los altos directivos. No hay procesos formales de rendición de cuentas. No hay transparencia.",
    2: "La información es inaccesible para los empleados. No hay transparencia en la gestión de la empresa. No hay un gobierno de la información.",
    3: "La información se gestiona de forma transparente y con procesos de rendición de cuentas, pero es incompleta o poco accesible.",
    4: "La información se gestiona de forma transparente, con procesos de rendición de cuentas. Se promueve la comunicación abierta con los empleados.",
    5: "La información es accesible y transparente. El acceso a la información y los procesos de rendición de cuentas son un motor de la empresa y una herramienta de empoderamiento.",
  },
  go: {
    1: "El gobierno corporativo está ausente o es informal. No hay un plan estratégico ni procesos de toma de decisiones definidos.",
    2: "El gobierno corporativo es informal o está en proceso de definición. Hay una dirección clara de la alta gerencia, pero no hay un gobierno de la empresa.",
    3: "El gobierno corporativo es funcional y la toma de decisiones está basada en la información y las metas de la empresa.",
    4: "El gobierno corporativo es coherente, con procesos claros de toma de decisiones y una dirección estratégica definida.",
    5: "El gobierno corporativo es un motor de la empresa, que promueve la toma de decisiones efectiva y la sostenibilidad a largo plazo. La gobernanza de la empresa es un activo.",
  },
  li: {
    1: "El liderazgo es ausente o no está definido. No hay habilidades de liderazgo en los diferentes niveles de la organización. El liderazgo no es un motor.",
    2: "El liderazgo es funcional, se basa en la experiencia. La empresa no tiene un plan de desarrollo para los líderes en los diferentes niveles de la organización.",
    3: "El liderazgo se fomenta en los diferentes niveles de la organización. Hay un plan de desarrollo para los líderes.",
    4: "El liderazgo está bien definido, hay un plan de desarrollo de líderes. El liderazgo es un activo clave y un motor para la organización.",
    5: "El liderazgo es un motor para el crecimiento y el desarrollo de la empresa. Se ha incorporado en el ADN de la organización.",
  },
  ca: {
    1: "La cadena de mando es informal y confusa, con múltiples líderes y toma de decisiones arbitraria. Hay una mala comunicación entre los diferentes niveles de la organización.",
    2: "La cadena de mando está definida y es funcional, pero no promueve el empoderamiento y la autonomía de los colaboradores.",
    3: "La cadena de mando es clara, con un plan de empoderamiento para los diferentes niveles de la organización.",
    4: "La cadena de mando es coherente y funcional, con procesos de toma de decisiones definidos. Se promueve el empoderamiento y la autonomía de los colaboradores.",
    5: "La cadena de mando es un motor de empoderamiento y crecimiento para la empresa. Es un activo para la toma de decisiones efectiva y la sostenibilidad a largo plazo.",
  },
  pe: {
    1: "Las políticas de empleados están ausentes o son informales. No hay un sistema de gestión del talento ni procesos de evaluación del desempeño.",
    2: "Las políticas de empleados son ambiguas e incoherentes, con un sistema de gestión del talento informal. No hay un plan de evaluación de desempeño.",
    3: "Las políticas de empleados son coherentes y claras. La empresa cuenta con un sistema de gestión del talento que promueve la equidad y la transparencia.",
    4: "Las políticas de empleados son un motor de la empresa, se promueve el empoderamiento y la autonomía de los colaboradores. La empresa tiene un plan de evaluación de desempeño.",
    5: "Las políticas de empleados son un activo para la organización. Se promueve el empoderamiento de los colaboradores, su crecimiento y desarrollo, y la empresa es un 'imán de talento'.",
  },
  cpd: {
    1: "La empresa no tiene un plan de desarrollo profesional y crecimiento para los colaboradores. Los empleados no tienen un plan de carrera. No hay una cultura de desarrollo continuo.",
    2: "La empresa tiene un plan de desarrollo profesional y crecimiento, pero es un proceso informal y no es un motor de la empresa. No hay un plan de carrera.",
    3: "La empresa tiene un plan de desarrollo profesional y crecimiento, con procesos de evaluación de desempeño. Es funcional.",
    4: "La empresa tiene un plan de desarrollo profesional y crecimiento, que promueve el empoderamiento y la autonomía de los colaboradores.",
    5: "La empresa tiene un plan de desarrollo profesional y crecimiento, que es un activo para la organización. Los colaboradores se sienten comprometidos y motivados. La cultura de desarrollo es un pilar.",
  },
  rc: {
    1: "El proceso de reclutamiento y contratación es informal y se basa en referidos. No hay un plan de reclutamiento ni una estrategia de contratación.",
    2: "El proceso de reclutamiento y contratación es poco claro, con un plan de reclutamiento poco funcional. No hay una estrategia de contratación.",
    3: "El proceso de reclutamiento y contratación está bien definido, con una estrategia clara y procesos de reclutamiento que promueven la equidad y la transparencia.",
    4: "El proceso de reclutamiento y contratación es un motor de la empresa, se basa en la equidad y la transparencia. La empresa es reconocida por su cultura.",
    5: "El proceso de reclutamiento y contratación es un activo, que promueve la transparencia y la equidad. La empresa es un 'imán de talento'.",
  },
  pv: {
    1: "La propuesta de valor está ausente, no es coherente o no está alineada con las necesidades de los clientes. El producto no tiene un propósito claro.",
    2: "La propuesta de valor es ambigua, no es coherente o no está alineada con las necesidades de los clientes. El producto no tiene un propósito claro.",
    3: "La propuesta de valor está bien definida, es coherente y está alineada con las necesidades de los clientes. Es funcional, pero no es un motor de la empresa.",
    4: "La propuesta de valor es un activo de la empresa, es un motor para la innovación y el crecimiento. La empresa se diferencia de su competencia.",
    5: "La propuesta de valor es el ADN de la empresa, que promueve la innovación, el crecimiento y la sostenibilidad a largo plazo. Es un activo para la empresa.",
  },
  ps: {
    1: "Los productos y servicios no tienen un propósito claro, son de baja calidad y no están alineados con las necesidades de los clientes.",
    2: "Los productos y servicios son de calidad, pero no están alineados con las necesidades de los clientes y no tienen un propósito claro.",
    3: "Los productos y servicios están bien definidos, con un propósito claro y están alineados con las necesidades de los clientes. Es funcional, pero no es un motor de la empresa.",
    4: "Los productos y servicios son un activo para la empresa, que promueven la innovación y el crecimiento. La empresa se diferencia de su competencia.",
    5: "Los productos y servicios son el ADN de la empresa, son un motor para la innovación y la sostenibilidad a largo plazo. La empresa se diferencia de su competencia.",
  },
  cd: {
    1: "Los canales de distribución son informales y no están alineados con las necesidades de los clientes. No hay una estrategia de distribución.",
    2: "Los canales de distribución son poco claros, con una estrategia de distribución informal y poco funcional. No hay un gobierno de la información.",
    3: "Los canales de distribución están bien definidos, con una estrategia de distribución clara y procesos de gestión de la información. Es funcional.",
    4: "Los canales de distribución son un motor de la empresa, que promueve la innovación y el crecimiento. La empresa se diferencia de su competencia.",
    5: "Los canales de distribución son el ADN de la empresa, que promueven la innovación, el crecimiento y la sostenibilidad a largo plazo. Es un activo para la empresa.",
  },
  co: {
    1: "Las capacidades organizacionales están ausentes o son informales, lo que impide que la empresa cumpla con sus metas estratégicas.",
    2: "Las capacidades organizacionales son funcionales, pero no están alineadas con las metas estratégicas de la empresa. No son un motor de la empresa.",
    3: "Las capacidades organizacionales están bien definidas y son coherentes con las metas estratégicas de la empresa. Son funcionales, pero no son un motor de la empresa.",
    4: "Las capacidades organizacionales son un motor de la empresa, que promueven la innovación y el crecimiento. La empresa se diferencia de su competencia.",
    5: "Las capacidades organizacionales son el ADN de la empresa, que promueven la innovación, el crecimiento y la sostenibilidad a largo plazo. Es un activo para la empresa.",
  },
  roe: {
    1: "La empresa no tiene una estrategia de relacionamiento con el ecosistema operativo. Hay un bajo relacionamiento con proveedores y socios estratégicos.",
    2: "La empresa tiene una estrategia de relacionamiento con el ecosistema operativo, pero es informal y poco funcional. Hay un bajo relacionamiento con proveedores y socios estratégicos.",
    3: "La empresa tiene una estrategia de relacionamiento con el ecosistema operativo, con procesos claros y un gobierno de la información. Es funcional.",
    4: "La empresa tiene una estrategia de relacionamiento con el ecosistema operativo, que promueve la innovación y el crecimiento. La empresa se diferencia de su competencia.",
    5: "La empresa tiene una estrategia de relacionamiento con el ecosistema operativo, que es un motor de la empresa. Es un activo para la innovación y la sostenibilidad.",
  },
  es: {
    1: "La experiencia de los stakeholders es informal y no está alineada con los objetivos de la empresa. No hay un plan de relacionamiento con los stakeholders.",
    2: "La experiencia de los stakeholders es funcional, pero no está alineada con los objetivos de la empresa. No hay un plan de relacionamiento con los stakeholders.",
    3: "La experiencia de los stakeholders está bien definida y es coherente con los objetivos de la empresa. Hay un plan de relacionamiento, pero no es un motor.",
    4: "La experiencia de los stakeholders es un motor de la empresa, que promueve la innovación, el crecimiento y la sostenibilidad. La empresa se diferencia de su competencia.",
    5: "La experiencia de los stakeholders es el ADN de la empresa. Es un activo para la innovación, el crecimiento y la sostenibilidad a largo plazo.",
  },
  ep: {
    1: "Los procesos son informales o no están definidos, lo que causa ineficiencia y baja productividad. No hay un plan de estandarización.",
    2: "Los procesos están en proceso de definición o son poco claros. La empresa tiene una baja productividad.",
    3: "Los procesos están bien definidos, son coherentes y funcionales, pero no son un motor de la empresa.",
    4: "Los procesos son un motor de la empresa, que promueven la eficiencia, la productividad y la innovación. La empresa se diferencia de su competencia.",
    5: "Los procesos son el ADN de la empresa, que promueven la eficiencia, la productividad, la innovación y la sostenibilidad. Son un activo para la empresa.",
  },
  mfv: {
    1: "El mapeo del flujo de valor es inexistente o informal. No hay un plan para la optimización y la reducción de costos.",
    2: "El mapeo del flujo de valor es un proceso informal, con una baja optimización y una baja reducción de costos. No hay un plan de optimización.",
    3: "El mapeo del flujo de valor está bien definido, con un plan de optimización y una reducción de costos. Es funcional, pero no es un motor.",
    4: "El mapeo del flujo de valor es un motor de la empresa, que promueve la eficiencia y la reducción de costos. La empresa se diferencia de su competencia.",
    5: "El mapeo del flujo de valor es el ADN de la empresa, que promueve la eficiencia, la reducción de costos y la sostenibilidad. Es un activo para la empresa.",
  },
  kpis: {
    1: "No hay indicadores de desempeño. La empresa no mide el éxito de sus operaciones. No hay una cultura de medición.",
    2: "Hay indicadores de desempeño, pero no están alineados con los objetivos de la empresa y no son funcionales. No hay una cultura de medición.",
    3: "Hay indicadores de desempeño, que están alineados con los objetivos de la empresa. Son funcionales, pero no son un motor.",
    4: "Los indicadores de desempeño son un motor de la empresa, que promueve la toma de decisiones efectiva. La empresa se diferencia de su competencia.",
    5: "Los indicadores de desempeño son el ADN de la empresa, que promueven la toma de decisiones efectiva y la sostenibilidad a largo plazo. Son un activo para la empresa.",
  },
  io: {
    1: "La innovación es inexistente. La empresa no invierte en investigación y desarrollo. No hay una cultura de innovación.",
    2: "La innovación es un proceso informal, con una baja inversión en investigación y desarrollo. No hay una cultura de innovación.",
    3: "La innovación es un proceso bien definido, con una inversión en investigación y desarrollo. Es funcional, pero no es un motor de la empresa.",
    4: "La innovación es un motor de la empresa, que promueve el crecimiento y la sostenibilidad. La empresa se diferencia de su competencia.",
    5: "La innovación es el ADN de la empresa, que promueve el crecimiento, la sostenibilidad y la diferenciación. Es un activo para la empresa.",
  },
  ap: {
    1: "La automatización de procesos es inexistente. Los procesos se ejecutan manualmente. Hay una baja productividad y eficiencia.",
    2: "La automatización de procesos es un proceso informal, con una baja inversión en tecnología. La empresa tiene una baja productividad.",
    3: "La automatización de procesos está bien definida, con una inversión en tecnología. Es funcional, pero no es un motor de la empresa.",
    4: "La automatización de procesos es un motor de la empresa, que promueve la eficiencia, la productividad y la innovación. La empresa se diferencia de su competencia.",
    5: "La automatización de procesos es el ADN de la empresa, que promueve la eficiencia, la productividad y la innovación. Es un activo para la empresa.",
  },
  gd: {
    1: "El gobierno de datos es inexistente o informal. La empresa no gestiona la información de forma coherente y segura. No hay una cultura de datos.",
    2: "El gobierno de datos es un proceso informal, con una baja inversión en tecnología. Hay una baja seguridad de la información.",
    3: "El gobierno de datos está bien definido, con una inversión en tecnología. Es funcional, pero no es un motor de la empresa.",
    4: "El gobierno de datos es un motor de la empresa, que promueve la toma de decisiones efectiva y la seguridad de la información. La empresa se diferencia de su competencia.",
    5: "El gobierno de datos es el ADN de la empresa, que promueve la toma de decisiones efectiva, la seguridad de la información y la sostenibilidad. Es un activo para la empresa.",
  },
  ir: {
    1: "La empresa no tiene un inventario de recursos. La gestión de recursos es informal y poco eficiente. No hay un plan de gestión de recursos.",
    2: "La empresa tiene un inventario de recursos, pero es un proceso informal. La gestión de recursos es ineficiente y no hay un plan de gestión.",
    3: "La empresa tiene un inventario de recursos, con procesos de gestión claros y un plan de gestión. Es funcional, pero no es un motor.",
    4: "La empresa tiene un inventario de recursos, que es un motor de la empresa. Promueve la eficiencia y la reducción de costos. La empresa se diferencia.",
    5: "La empresa tiene un inventario de recursos, que es el ADN de la empresa. Promueve la eficiencia, la reducción de costos y la sostenibilidad. Es un activo.",
  },
  inc: {
    1: "La inteligencia de negocio y la comunicación externa son inexistentes o informales. No hay un plan de comunicación.",
    2: "La inteligencia de negocio y la comunicación externa son informales, con una baja inversión en tecnología. Hay una baja comunicación externa.",
    3: "La inteligencia de negocio y la comunicación externa están bien definidas, con un plan de comunicación claro. Es funcional, pero no es un motor.",
    4: "La inteligencia de negocio y la comunicación externa son un motor de la empresa, que promueve la toma de decisiones efectiva y la sostenibilidad. La empresa se diferencia.",
    5: "La inteligencia de negocio y la comunicación externa son el ADN de la empresa, que promueven la toma de decisiones efectiva, la sostenibilidad y la diferenciación. Es un activo.",
  },
  im: {
    1: "La inteligencia de mercado es inexistente o informal. La empresa no analiza el mercado y no toma decisiones basadas en la información. No hay un plan.",
    2: "La inteligencia de mercado es informal, con una baja inversión en tecnología. La empresa no analiza el mercado y no toma decisiones basadas en la información.",
    3: "La inteligencia de mercado está bien definida, con un plan de análisis del mercado y un gobierno de la información. Es funcional, pero no es un motor.",
    4: "La inteligencia de mercado es un motor de la empresa, que promueve la toma de decisiones efectiva y la sostenibilidad. La empresa se diferencia de su competencia.",
    5: "La inteligencia de mercado es el ADN de la empresa, que promueve la toma de decisiones efectiva, la sostenibilidad y la diferenciación. Es un activo.",
  },
  as: {
    1: "El análisis de stakeholders es inexistente o informal. La empresa no tiene un plan de relacionamiento con los stakeholders. No hay una cultura de análisis.",
    2: "El análisis de stakeholders es informal, con una baja inversión en tecnología. La empresa no tiene un plan de relacionamiento con los stakeholders.",
    3: "El análisis de stakeholders está bien definido, con un plan de relacionamiento con los stakeholders. Es funcional, pero no es un motor.",
    4: "El análisis de stakeholders es un motor de la empresa, que promueve la toma de decisiones efectiva y la sostenibilidad. La empresa se diferencia de su competencia.",
    5: "El análisis de stakeholders es el ADN de la empresa, que promueve la toma de decisiones efectiva, la sostenibilidad y la diferenciación. Es un activo.",
  },
  is: {
    1: "La inteligencia social es inexistente o informal. La empresa no analiza el impacto social de sus operaciones. No hay un plan.",
    2: "La inteligencia social es informal, con una baja inversión en tecnología. La empresa no analiza el impacto social de sus operaciones.",
    3: "La inteligencia social está bien definida, con un plan de análisis del impacto social de las operaciones. Es funcional, pero no es un motor.",
    4: "La inteligencia social es un motor de la empresa, que promueve la toma de decisiones efectiva y la sostenibilidad. La empresa se diferencia de su competencia.",
    5: "La inteligencia social es el ADN de la empresa, que promueve la toma de decisiones efectiva, la sostenibilidad y la diferenciación. Es un activo.",
  },
  ra: {
    1: "El relacionamiento con las asociaciones es inexistente o informal. La empresa no tiene un plan de relacionamiento con asociaciones.",
    2: "El relacionamiento con las asociaciones es informal, con una baja inversión en tecnología. La empresa no tiene un plan de relacionamiento.",
    3: "El relacionamiento con las asociaciones está bien definido, con un plan de relacionamiento con asociaciones. Es funcional, pero no es un motor.",
    4: "El relacionamiento con las asociaciones es un motor de la empresa, que promueve la innovación, el crecimiento y la sostenibilidad. La empresa se diferencia de su competencia.",
    5: "El relacionamiento con las asociaciones es el ADN de la empresa, que promueve la innovación, el crecimiento y la sostenibilidad a largo plazo. Es un activo para la empresa.",
  },
  rs: {
    1: "El relacionamiento con los socios es inexistente o informal. La empresa no tiene un plan de relacionamiento con socios.",
    2: "El relacionamiento con los socios es informal, con una baja inversión en tecnología. La empresa no tiene un plan de relacionamiento.",
    3: "El relacionamiento con los socios está bien definido, con un plan de relacionamiento con socios. Es funcional, pero no es un motor.",
    4: "El relacionamiento con los socios es un motor de la empresa, que promueve la innovación, el crecimiento y la sostenibilidad. La empresa se diferencia de su competencia.",
    5: "El relacionamiento con los socios es el ADN de la empresa, que promueve la innovación, el crecimiento y la sostenibilidad a largo plazo. Es un activo para la empresa.",
  },
  pc: {
    1: "La participación comunitaria es inexistente o informal. La empresa no tiene un plan de participación comunitaria.",
    2: "La participación comunitaria es informal, con una baja inversión en tecnología. La empresa no tiene un plan de participación comunitaria.",
    3: "La participación comunitaria está bien definida, con un plan de participación comunitaria. Es funcional, pero no es un motor.",
    4: "La participación comunitaria es un motor de la empresa, que promueve la innovación, el crecimiento y la sostenibilidad. La empresa se diferencia de su competencia.",
    5: "La participación comunitaria es el ADN de la empresa, que promueve la innovación, el crecimiento y la sostenibilidad a largo plazo. Es un activo para la empresa.",
  },
  gr: {
    1: "La gestión de riesgo es inexistente o informal. La empresa no tiene un plan de gestión de riesgo.",
    2: "La gestión de riesgo es informal, con una baja inversión en tecnología. La empresa no tiene un plan de gestión de riesgo.",
    3: "La gestión de riesgo está bien definida, con un plan de gestión de riesgo. Es funcional, pero no es un motor.",
    4: "La gestión de riesgo es un motor de la empresa, que promueve la toma de decisiones efectiva y la sostenibilidad. La empresa se diferencia de su competencia.",
    5: "La gestión de riesgo es el ADN de la empresa, que promueve la toma de decisiones efectiva, la sostenibilidad y la diferenciación. Es un activo.",
  },
  pl: {
    1: "La planificación legal y el cumplimiento son inexistentes o informales. La empresa no tiene un plan de cumplimiento.",
    2: "La planificación legal y el cumplimiento son informales, con una baja inversión en tecnología. La empresa no tiene un plan de cumplimiento.",
    3: "La planificación legal y el cumplimiento están bien definidos, con un plan de cumplimiento claro. Es funcional, pero no es un motor.",
    4: "La planificación legal y el cumplimiento son un motor de la empresa, que promueve la toma de decisiones efectiva y la sostenibilidad. La empresa se diferencia de su competencia.",
    5: "La planificación legal y el cumplimiento son el ADN de la empresa, que promueven la toma de decisiones efectiva, la sostenibilidad y la diferenciación. Es un activo.",
  },
  sc: {
    1: "La seguridad cibernética es inexistente o informal. La empresa no tiene un plan de seguridad. La información es vulnerable.",
    2: "La seguridad cibernética es informal, con una baja inversión en tecnología. La empresa no tiene un plan de seguridad. La información es vulnerable.",
    3: "La seguridad cibernética está bien definida, con un plan de seguridad. Es funcional, pero no es un motor.",
    4: "La seguridad cibernética es un motor de la empresa, que promueve la toma de decisiones efectiva y la sostenibilidad. La empresa se diferencia de su competencia.",
    5: "La seguridad cibernética es el ADN de la empresa, que promueve la toma de decisiones efectiva, la sostenibilidad y la diferenciación. Es un activo.",
  },
};

const evolutionSteps = {
    // Ejemplo de pasos de evolución para cada elemento
    vm: [
        'Paso 1: Define tu visión y misión de forma clara y concisa.',
        'Paso 2: Comunica la visión y misión a toda la organización.',
        'Paso 3: Integra la visión y misión en la toma de decisiones diarias.',
        'Paso 4: Fomenta la participación de los colaboradores en la revisión y evolución de la visión y misión.',
    ],
    vc: [
        'Paso 1: Identifica y define los valores que representan a la organización.',
        'Paso 2: Crea un plan para que los valores sean parte de la cultura diaria.',
        'Paso 3: Reconoce y premia los comportamientos que reflejan los valores.',
    ],
    cc: [
        'Paso 1: Realiza encuestas de satisfacción para medir el compromiso actual.',
        'Paso 2: Implementa canales de comunicación transparentes y abiertos.',
        'Paso 3: Fomenta la autonomía y la participación de los colaboradores en proyectos importantes.',
    ],
    //... (Añadir pasos para el resto de elementos si es necesario)
};

const getElementsArray = () => {
  let elements = [];
  for (const domainKey in framework) {
    for (const componentKey in framework[domainKey].components) {
      elements = elements.concat(framework[domainKey].components[componentKey].elements);
    }
  }
  return elements;
};

const allElements = getElementsArray();

const Header = ({ onLogout }) => (
  <header className="bg-white shadow-md p-4 sticky top-0 z-50">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-gray-800">Navi Net Group</h1>
        <div className="hidden sm:block">
          <span className="text-sm font-semibold text-gray-600">Compañía: </span>
          <span className="text-sm text-gray-800">DemoCorp</span>
          <span className="text-sm font-semibold text-gray-600 ml-4">Usuario: </span>
          <span className="text-sm text-gray-800">Juan Pérez</span>
        </div>
      </div>
      <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
        Cerrar Sesión
      </button>
    </div>
  </header>
);

const App = () => {
  const [view, setView] = useState('home');
  const [selectedLevel, setSelectedLevel] = useState(5);
  const [scores, setScores] = useState({});
  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });

  useEffect(() => {
    // Inicializar los scores con un valor por defecto (ej. 1)
    const initialScores = allElements.reduce((acc, element) => {
      acc[element.id] = 1;
      return acc;
    }, {});
    setScores(initialScores);
  }, []);

  const handleScoreChange = (elementId, score) => {
    setScores(prevScores => ({
      ...prevScores,
      [elementId]: parseInt(score, 10)
    }));
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(parseInt(e.target.value, 10));
  };

  const handleMouseEnter = (e, elementId, level) => {
    const rect = e.target.getBoundingClientRect();
    setTooltip({
      visible: true,
      content: descriptions[elementId][level],
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, content: '', x: 0, y: 0 });
  };

  const calculateScores = useMemo(() => {
    const summaryData = [];
    const radarChartData = {};
    let totalAchievedScore = 0;
    let maxPossibleScore = 0;

    for (const domainKey in framework) {
      let domainAchievedScore = 0;
      let domainMaxScore = 0;

      for (const componentKey in framework[domainKey].components) {
        const component = framework[domainKey].components[componentKey];
        radarChartData[domainKey] = radarChartData[domainKey] || {
          domainName: framework[domainKey].name,
          data: []
        };
        
        component.elements.forEach(element => {
          const realScore = scores[element.id] || 1;
          const weight = elementWeights[selectedLevel][element.id];
          const expectedScore = selectedLevel;

          const achievedElementScore = realScore * weight;
          const maxElementScore = expectedScore * weight;

          totalAchievedScore += achievedElementScore;
          maxPossibleScore += maxElementScore;
          domainAchievedScore += achievedElementScore;
          domainMaxScore += maxElementScore;
        });

        // Add component data to radar chart data
        const componentRealScore = component.elements.reduce((sum, el) => sum + (scores[el.id] || 1), 0) / component.elements.length;
        radarChartData[domainKey].data.push({
          subject: component.name,
          Real: componentRealScore.toFixed(2),
          Esperado: selectedLevel,
          fullMark: 5,
        });
      }

      summaryData.push({
        domain: framework[domainKey].name,
        achieved: domainAchievedScore.toFixed(2),
        max: domainMaxScore.toFixed(2),
      });
    }

    const completionPercentage = maxPossibleScore > 0 ? (totalAchievedScore / maxPossibleScore) * 100 : 0;
    
    // Análisis de brechas
    const gapAnalysis = allElements.map(element => {
      const realLevel = scores[element.id] || 1;
      const expectedLevel = selectedLevel;
      const gap = expectedLevel - realLevel;
      return {
        id: element.id,
        name: element.name,
        gap: gap,
        real: realLevel,
        expected: expectedLevel,
      };
    }).filter(e => e.gap > 0).sort((a, b) => b.gap - a.gap);

    return { totalAchievedScore, maxPossibleScore, completionPercentage, summaryData, radarChartData, gapAnalysis };
  }, [scores, selectedLevel]);

  const chartData = calculateScores;

  const HomePage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8 text-center transition-opacity duration-1000 ease-in-out">
      <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-900 mb-6 drop-shadow-md">
        Navi Net Group
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-12 font-medium">
        Bienvenido a tu plataforma de diagnóstico. Explora los módulos y descubre el potencial de tu organización.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        <div className="bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 border border-indigo-200">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Módulo de Diagnóstico</h2>
          <p className="text-gray-600 text-sm mb-6">
            Evalúa la madurez de tu organización en sus componentes clave y genera un plan de acción.
          </p>
          <button
            onClick={() => setView('diagnostico')}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
          >
            Comenzar
          </button>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-xl border border-gray-200 opacity-60">
          <h2 className="text-2xl font-bold text-gray-500 mb-4">Dominios del Framework</h2>
          <p className="text-gray-400 text-sm mb-6">
            (El Ser, La Forma, El Entorno)
            <br />
            Descubre los pilares fundamentales que impulsan el crecimiento.
          </p>
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 font-bold py-3 px-6 rounded-lg cursor-not-allowed"
          >
            Próximamente
          </button>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-xl border border-gray-200 opacity-60">
          <h2 className="text-2xl font-bold text-gray-500 mb-4">Tablero de Gestión</h2>
          <p className="text-gray-400 text-sm mb-6">
            Monitorea el progreso de tus iniciativas y el impacto en tu organización.
          </p>
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 font-bold py-3 px-6 rounded-lg cursor-not-allowed"
          >
            Próximamente
          </button>
        </div>
      </div>
    </div>
  );

  const DiagnosticModule = () => (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="p-6 md:p-12 container mx-auto">
        {tooltip.visible && (
          <div
            style={{ top: tooltip.y - 20, left: tooltip.x, transform: 'translate(-50%, -100%)' }}
            className="absolute z-50 bg-gray-800 text-white text-xs rounded-lg p-2 shadow-lg transition-opacity duration-300 pointer-events-none opacity-100 max-w-sm"
          >
            {tooltip.content}
          </div>
        )}
        
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 mb-2">Módulo de Diagnóstico</h1>
          <p className="text-lg md:text-xl text-gray-600">
            Evalúa el nivel de madurez de tu organización y genera un plan de acción.
          </p>
          <button
            onClick={() => setView('home')}
            className="mt-4 bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300"
          >
            ← Volver al Inicio
          </button>
        </header>

        {/* Sección de Selección de Nivel y Resumen */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-indigo-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <label htmlFor="maturity-level-selector" className="block text-lg font-bold text-gray-700 mb-2">
                Selecciona el Nivel de Madurez Deseado
              </label>
              <select
                id="maturity-level-selector"
                className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                value={selectedLevel}
                onChange={handleLevelChange}
              >
                {levels.map(level => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-right">
              <h3 className="text-lg font-bold text-indigo-700">Puntaje Total</h3>
              <div className="mt-1 text-4xl font-extrabold text-gray-800">
                {chartData.totalAchievedScore.toFixed(2)}
                <span className="text-gray-500"> / {chartData.maxPossibleScore.toFixed(2)}</span>
              </div>
              <div className="text-xl font-bold text-indigo-500 mt-1">
                {chartData.completionPercentage.toFixed(0)}% de Cumplimiento
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de Calificación */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-indigo-200">
          <h2 className="text-2xl font-bold text-center mb-6 text-indigo-800">Cuestionario de Evaluación</h2>
          {Object.keys(framework).map(domainKey => {
            const domain = framework[domainKey];
            return (
              <div key={domainKey} className="mb-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <h3 className="text-xl font-bold text-indigo-700 mb-4">{domain.name}</h3>
                {Object.keys(domain.components).map(componentKey => {
                  const component = domain.components[componentKey];
                  return (
                    <div key={componentKey} className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">{component.name}</h4>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-8">
                        {component.elements.map(element => (
                          <div key={element.id} className="flex flex-col items-start">
                            <p className="font-semibold text-gray-700 mb-2">{element.name}</p>
                            <div className="flex space-x-2">
                              {[1, 2, 3, 4, 5].map(level => (
                                <button
                                  key={level}
                                  className={`
                                    w-10 h-10 rounded-full border-2 font-bold transition-all duration-200
                                    ${scores[element.id] === level
                                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                                      : 'bg-white text-indigo-600 border-indigo-400 hover:bg-indigo-100'
                                    }
                                  `}
                                  onClick={() => handleScoreChange(element.id, level)}
                                  onMouseEnter={(e) => handleMouseEnter(e, element.id, level)}
                                  onMouseLeave={handleMouseLeave}
                                >
                                  {level}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Gráficos de Resumen */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-indigo-200">
          <h2 className="text-2xl font-bold text-center mb-6 text-indigo-800">Gráficos de Resumen</h2>
          <p className="text-center text-gray-600 mb-6">
            Analiza el puntaje de cada dominio y el rendimiento de tu organización en sus tres dimensiones principales.
          </p>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-lg font-bold text-center mb-4 text-gray-700">Puntaje por Dominio</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData.summaryData}>
                  <XAxis dataKey="domain" tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 600 }} />
                  <YAxis domain={[0, 'auto']} />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="achieved" name="Puntaje Real" fill="#818cf8" radius={[10, 10, 0, 0]} />
                  <Bar dataKey="max" name="Puntaje Máximo" fill="#d1d5db" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-lg font-bold text-center mb-4 text-gray-700">Rendimiento General</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart outerRadius={90} data={Object.values(chartData.radarChartData).map(d => d.data).flat()}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 500 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 5]} tickCount={6} />
                  <Radar name="Nivel Real" dataKey="Real" stroke="#6366f1" fill="#818cf8" fillOpacity={0.6} />
                  <Radar name="Nivel Esperado" dataKey="Esperado" stroke="#a855f7" fill="#c084fc" fillOpacity={0.6} />
                  <RechartsTooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Gráficos de Radar por Dimensión */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-indigo-800">Visualización por Dimensión</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(chartData.radarChartData).map(domainData => (
              <div key={domainData.domainName} className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-lg font-bold text-center mb-4">{domainData.domainName}</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart outerRadius={90} data={domainData.data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 500 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 5]} tickCount={6} />
                    <Radar name="Nivel Real" dataKey="Real" stroke="#6366f1" fill="#818cf8" fillOpacity={0.6} />
                    <Radar name="Nivel Esperado" dataKey="Esperado" stroke="#a855f7" fill="#c084fc" fillOpacity={0.6} />
                    <RechartsTooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </div>

        {/* Análisis de Brechas y Plan de Acción */}
        {chartData.gapAnalysis.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-lg border border-indigo-200">
            <h3 className="text-2xl font-bold text-center mb-6 text-indigo-800">
              Plan Propuesto: Pasos Prioritarios
            </h3>
            <p className="text-center text-lg text-gray-700 mb-6">
              Identificamos los elementos con las brechas más grandes. Aquí tienes una guía para empezar a abordarlas.
            </p>
            <div className="space-y-8">
              {chartData.gapAnalysis.slice(0, 3).map((element, index) => (
                <div key={element.id} className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                  <h4 className="text-xl font-bold text-gray-800">
                    {index + 1}. {element.name}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 mb-3">
                    Brecha: <span className="font-bold text-red-600">{element.gap} puntos</span>
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    {(evolutionSteps[element.id] || []).map((step, stepIndex) => (
                      <li key={stepIndex} className="text-gray-700">
                        {step}
                      </li>
                    ))}
                  </ul>
                  {evolutionSteps[element.id] && evolutionSteps[element.id].length > 0 ? null : (
                      <p className="text-gray-500 italic text-sm">No hay pasos de evolución definidos para este elemento.</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="App">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        html, body, #root, .App {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
          height: 100%;
        }
        .fade-enter {
          opacity: 0;
        }
        .fade-enter-active {
          opacity: 1;
          transition: opacity 1000ms ease-in-out;
        }
        .tooltip {
          pointer-events: none;
        }
      `}</style>
      <Header />
      <div className={`transition-opacity duration-1000 ease-in-out ${view === 'diagnostico' ? 'opacity-100' : 'opacity-100'}`}>
        {view === 'home' ? <HomePage /> : <DiagnosticModule />}
      </div>
    </div>
  );
};

export default App;
