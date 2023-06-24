import User, { UserRole } from "@/lib/business/user";

export const DASHBOARD_ITEMS: { [key: string]: any } = {
  images: {
    id: "images",
    name: "Imagens",
    // path: '/images',
    src: "/images/docker-image.png",
    count: 6,
    active: false,
    roles: [UserRole.ADMIN],
  },
  services: {
    id: "services",
    name: "Serviços",
    // path: '/services',
    src: "/images/docker-service.png",
    count: 6,
    active: true,
    roles: [UserRole.ADMIN, UserRole.OPERATOR],
  },
  volumes: {
    id: "volumes",
    name: "Volumes",
    // path: '/volumes',
    src: "/images/volume.png",
    roles: [UserRole.ADMIN],
    count: 10,
    active: true,
  },
  stacks: {
    id: "stacks",
    name: "Stacks",
    // path: '/stacks',
    // src: '/images/setting.png',
    icon: `
      <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"></path>
      </svg>
      `,
    active: true,
    roles: [UserRole.ADMIN, UserRole.OPERATOR],
  },
};  