import {Stack} from "@mui/system";
import {Link, Outlet, Route, Routes} from "react-router-dom"
import {Home} from "./module/core/components/Home";
import {DataScrapperApp} from "./module/datascrapper/components/DataScrapperApp";
import {JsonViewerApp} from "./module/jsonviewer/components/JsonViewerApp";
import {NoteApp} from "./module/notes/components/NoteApp";

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/note" element={<NoteApp />} />
        <Route path="/json" element={<JsonViewerApp />} />
        <Route path="/scrap" element={<DataScrapperApp />} />
      </Route>
    </Routes>
  )
}

const Layout = () => {
  return (
    <Stack>
      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/note">Note app</Link>
        </li>
        <li>
          <Link to="/json">Json view</Link>
        </li>
        <li>
          <Link to="/scrap">Data scrapping</Link>
        </li>
      </ul>
      <Outlet />
    </Stack>
  );
}
