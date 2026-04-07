import { createRoot } from "react-dom/client";
import "./tailwind.css";
// import FrameworkList from "./FrameworkListSearcher";
import ResponsiveText from "./ResponsiveText";

createRoot(document.getElementById("root"))
    .render(
        <div>
            {/* <FrameworkList/>         */}
            <ResponsiveText/>
        </div>
        
    )
