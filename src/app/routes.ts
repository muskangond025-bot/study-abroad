import { createBrowserRouter } from "react-router";
import { Root } from './Root';
import { Home } from './pages/Home';
import { About } from './pages/About';
import Services from './pages/Services';
import { Countries } from './pages/Destinations';
import { Universities } from './pages/Universities';
import { Contact } from './pages/Contact';
import { Concierge } from './pages/Concierge';
import { Compare } from './pages/Compare';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "destinations", Component: Countries },
      { path: "universities", Component: Universities },
      { path: "concierge", Component: Concierge },
      { path: "compare", Component: Compare },
      { path: "contact", Component: Contact },
    ],
  },
]);