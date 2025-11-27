import { useState } from "react";
import { db, storage } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [thumbFile, setThumbFile] = useState(null);

  const handleUploadProduct = async (e) => {
    e.preventDefault();

    try {
      let thumbnailURL = "";

      // 🔥 1) Subir archivo si existe
      if (thumbFile) {
        const fileRef = ref(storage, `products/${thumbFile.name}-${Date.now()}`);
        await uploadBytes(fileRef, thumbFile);
        thumbnailURL = await getDownloadURL(fileRef);
      }

      // 🔥 2) Guardar en Firestore
      await addDoc(collection(db, "products"), {
        name,
        price: Number(price),
        image: thumbnailURL,
        thumb: thumbnailURL, // opcional si quieres las dos
        createdAt: serverTimestamp(),
      });

      alert("Producto añadido con éxito!");
      setName("");
      setPrice("");
      setThumbFile(null);
    } catch (err) {
      console.error(err);
      alert("Error al subir producto");
    }
  };

  return (
    <div className="admin-panel">
      <h2>Añadir producto</h2>

      <form onSubmit={handleUploadProduct} className="admin-form">
        
        <input
          type="text"
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        {/* 🔥 Campo para imagen */}
        <label className="file-label">
          Miniatura del producto:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbFile(e.target.files[0])}
            required
          />
        </label>

        <button type="submit">Agregar producto</button>
      </form>

      {/* Vista previa */}
      {thumbFile && (
        <div className="preview">
          <h4>Vista previa</h4>
          <img
            src={URL.createObjectURL(thumbFile)}
            alt="preview"
            style={{ width: "160px", borderRadius: "8px", marginTop: "12px" }}
          />
        </div>
      )}
    </div>
  );
}
