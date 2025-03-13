import { useState, useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Bounds, useGLTF } from "@react-three/drei";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { BiFullscreen } from "react-icons/bi";
import * as THREE from "three";

const Model = ({ file }) => {
  const { scene } = useGLTF(file);
  return <primitive object={scene} />;
};

const FitViewHelper = ({ boundsRef, models }) => {
  const { camera, controls } = useThree();

  useEffect(() => {
    if (!models.length) return;

    const box = new THREE.Box3();
    models.forEach(({ scene }) => box.expandByObject(scene));

    const center = new THREE.Vector3();
    box.getCenter(center);
    const size = new THREE.Vector3();
    box.getSize(size);

    camera.position.set(center.x, center.y + size.y, center.z + size.z * 2);
    camera.lookAt(center);
    controls.target.set(center.x, center.y, center.z);
    controls.update();
  }, [models, camera, controls]);

  return null;
};

export default function ThreeCanvas() {
  const [files, setFiles] = useState([]);
  const [fileURLs, setFileURLs] = useState([]);
  const [showModel, setShowModel] = useState(true);
  const boundsRef = useRef();
  const orbitRef = useRef();
  const [models, setModels] = useState([]);

  useEffect(() => {
    return () => fileURLs.forEach((url) => URL.revokeObjectURL(url));
  }, [fileURLs]);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0 && files.length < 3) {
      const newFiles = Array.from(event.target.files).slice(0, 3 - files.length);
      const newFileURLs = newFiles.map((file) => URL.createObjectURL(file));
      setFileURLs((prev) => [...prev, ...newFileURLs]);
      setFiles((prev) => [...prev, ...newFileURLs]);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center p-4 bg-light shadow rounded">
      <h4 className="mb-3">3D Canvas</h4>

      <div className="mb-3 text-center">
        <label htmlFor="ThreeD">
          <input
            id="ThreeD"
            className="d-none form-control"
            type="file"
            onChange={handleFileChange}
            accept=".glb, .gltf"
            multiple
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/8684/8684808.png"
            alt=""
            className="w-25"
          />
          <h3 className="text-center">Upload The Files</h3>
        </label>
      </div>

      <div className="canvas-container border rounded bg-white mb-3" style={{ width: "100%", height: "75vh" }}>
        <Canvas camera={{ position: [3, 3, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 5, 2]} intensity={1.5} castShadow />
          <spotLight position={[-3, 5, 2]} intensity={1.2} angle={0.3} penumbra={0.5} castShadow />

          <OrbitControls ref={orbitRef} makeDefault  panSpeed={0.5} zoomSpeed={1} />

          <Bounds ref={boundsRef} fit clip observe>
            {showModel && files.map((file, index) => <Model key={index} file={file} />)}
          </Bounds>

          <FitViewHelper boundsRef={boundsRef} models={models} />
        </Canvas>
      </div>

      {files.length > 0 && (
        <div className="d-flex gap-3">
          <button className="btn btn-primary" onClick={() => setShowModel(!showModel)}>
            {showModel ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
          </button>
          <button className="btn btn-success" onClick={() => setModels([...models])}>
            <BiFullscreen size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
