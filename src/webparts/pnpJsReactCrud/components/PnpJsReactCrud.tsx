import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './PnpJsReactCrud.module.scss';
import type { IPnpJsReactCrudProps } from './IPnpJsReactCrudProps';
//import { SPFI } from '@pnp/sp';
import SharePointRepository from '../../Repository/SharePointRepository';
import { IPetListItem } from '../../Common/IListItem';

const PetForm: React.FC<{
  pet: Partial<IPetListItem>;
  onSave: (petToSave: Partial<IPetListItem>) => void;
  onCancel: () => void;
}> = ({ pet, onSave, onCancel }) => {
  const [formData, setFormData] = React.useState(pet);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.formOverlay}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>{formData.ID ? 'Edit Pet' : 'Create Pet'}</h3>
        <div>
          <label>Name:</label>
          <input type="text" name="Title" value={formData.Title || ''} onChange={handleChange} required />
        </div>
        <div>
          <label>Breed:</label>
          <input type="text" name="Breed" value={formData.Breed || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Species:</label>
          <input type="text" name="PetSpecies" value={formData.PetSpecies || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Appointment (YYYY-MM-DD):</label>
          <input type="date" name="Appointment" value={formData.Appointment ? formData.Appointment.toDateString().split('T')[0] : ''} onChange={handleChange} />
        </div>
        <div className={styles.formButtons}>
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

const PnpJsReactCrud: React.FC<IPnpJsReactCrudProps> = (props) => {
  const [pets, setPets] = useState<IPetListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedPet, setSelectedPet] = useState<Partial<IPetListItem> | null>(null);

  // As in the PnPspCrudWebPart, we are fetching from a specific site.
  // This could be made into a web part property for more flexibility.
  const weburl = "https://m365devlab01.sharepoint.com/sites/PowerPlatformDev";

  const repository = React.useMemo(() => {
    return props.sp ? new SharePointRepository<IPetListItem>(props.sp, "Pets", weburl) : null;
  }, [props.sp, weburl]);

  const fetchPets = React.useCallback(async (): Promise<void> => {
    if (!repository) return;
    try {
      setLoading(true);
      setError(null);
      const allPets = await repository.getAll();
      setPets(allPets);
    } catch (e) {
      console.error("Error fetching pets:", e);
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [repository]);

  useEffect(() => {
    if (repository) {
      fetchPets().catch(console.error);
    } else {
      setError("SPFI object not provided.");
      setLoading(false);
    }
  }, [repository, fetchPets]);

  const handleDeleteClick = async (id: number): Promise<void> => {
    if (!repository) return;
    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        await repository.delete(id);
        setPets(currentPets => currentPets.filter(p => p.ID !== id));
      } catch (e) {
        console.error(e);
        setError((e as Error).message);
      }
    }
  };

  const handleCreateClick = (): void => {
    setSelectedPet({});
    setShowForm(true);
  };

  const handleEditClick = (pet: IPetListItem): void => {
    setSelectedPet({ ...pet });
    setShowForm(true);
  };

  const handleFormCancel = (): void => {
    setShowForm(false);
    setSelectedPet(null);
  };

  const handleFormSave = async (petToSave: IPetListItem): Promise<void> => {
    if (!repository) return;
    try {
      if (petToSave.ID) {
        await repository.update(petToSave);
      } else {
        await repository.add(petToSave);
      }
      setShowForm(false);
      setSelectedPet(null);
      await fetchPets(); // Refetch data to show changes
    } catch (e) {
      console.error(e);
      setError((e as Error).message);
    }
  };

  if (loading) {
    return <section className={styles.pnpJsReactCrud}><div>Loading...</div></section>;
  }

  if (error) {
    return <section className={styles.pnpJsReactCrud}><div className={styles.error}>Error: {error}</div></section>;
  }

  return (
    <section className={styles.pnpJsReactCrud}>
      {showForm && selectedPet && <PetForm pet={selectedPet} onSave={handleFormSave} onCancel={handleFormCancel} />}
      <div className={styles.welcome}>
        <h2>Pets from another site collection</h2>
      </div>
      <div className={styles.toolbar}>
        <button onClick={handleCreateClick}>
          Create New Pet
        </button>
      </div>
      <table className={styles.grid}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Breed</th>
            <th>Species</th>
            <th>Appointment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.length > 0 ? (
            pets.map((pet) => (
              <tr key={pet.ID}>
                <td>{pet.ID}</td>
                <td>{pet.Title}</td>
                <td>{pet.Breed}</td>
                <td>{pet.PetSpecies}</td>
                <td>{pet.Appointment ? pet.Appointment : 'N/A'}</td>
                <td className={styles.actions}>
                  <button onClick={() => handleEditClick(pet)}>Edit</button>
                  <button onClick={() => handleDeleteClick(pet.ID)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>
                No pets found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default PnpJsReactCrud;
