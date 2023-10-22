import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable, { TableColumn } from "react-data-table-component";
import Loader from "../../components/Loader";
import EditPen from "../../assets/icons/EditPen";
import Delete from "../../assets/icons/Delete";
import axios from "../../api/axios";

// SETTING DATA TYPE
interface DataRow {
  id: number;
  user: any;
  thumbnail: string;
  price: string;
  about: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
}

// SORTING FUNCTION
const customSort = (rows: any, selector: any, direction: any) => {
  return rows.sort((rowA: any, rowB: any) => {
    // use the selector function to resolve your field names by passing the sort comparitors
    const aField = selector(rowA);
    const bField = selector(rowB);

    let comparison = 0;

    if (aField > bField) {
      comparison = 1;
    } else if (aField < bField) {
      comparison = -1;
    }

    return direction === "desc" ? comparison * -1 : comparison;
  });
};

function Table({ data, pending, query }: { data: any; pending: boolean; query: string }): JSX.Element {
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState<any>([]);
  // SETTING TABLE COLUMN
  const columns: TableColumn<DataRow>[] = [
    // Image
    {
      name: "Image",
      cell: (row) => (
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={row.thumbnail} alt="profile picture" />
        </div>
      ),
      maxWidth: "100px",
    },
    // Name
    {
      name: "Name",
      sortable: true,
      selector: (row) => row.user["first_name"] + row.user["last_name"],
      cell: (row) => (
        <p>
          {row.user["first_name"]} {row.user["last_name"]}
        </p>
      ),
      maxWidth: "200px",
    },
    // Price
    {
      name: "Price",
      sortable: true,
      selector: (row) => row.price,
      cell: (row) => <p>${row.price}</p>,
      maxWidth: "150px",
    },
    // About
    // {
    //   name: "About",
    //   sortable: true,
    //   selector: (row) => row.about,
    // },
    // Address
    {
      name: "Address",
      sortable: true,
      selector: (row) => row.address,
      maxWidth: "300px",
    },
    // Latitude
    {
      name: "Latitude",
      sortable: true,
      selector: (row) => row.latitude,
      maxWidth: "150px",
    },
    // Longitude
    {
      name: "Longitude",
      sortable: true,
      selector: (row) => row.longitude,
      maxWidth: "150px",
    },
    // Category
    {
      name: "Category",
      sortable: true,
      selector: (row) => row.category,
      maxWidth: "200px",
    },
    // Action
    {
      name: "Action",
      cell: (row) => (
        <div key={row.id} className="flex flex-row gap-2">
          <button onClick={() => EditRow(row.id)} className="bg-info-100 p-2">
            <EditPen color="#ffffff" height="1em" />
          </button>
          <button onClick={() => DeleteRow(row.id)} className="bg-danger-100 p-2">
            <Delete color="#ffffff" height="1em" />
          </button>
        </div>
      ),
      maxWidth: "100px",
    },
  ];
  // Edit Function
  const EditRow = (id: number) => {
    navigate(`/provider/edit/${id}`);
  };
  // Delete Function
  const DeleteRow = async (id: number) => {
    try {
      const response = await axios.delete(`/providers/delete/${id}`);
      setCurrentData((prevData: any) => prevData.filter((row: any) => row.id !== id));
      alert(response.data.message);
    } catch (err: any) {
      alert(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    setCurrentData(
      data.filter(
        (item: any) =>
          item.user.first_name.toLowerCase().includes(query.toLocaleLowerCase()) ||
          item.user.last_name.toLowerCase().includes(query.toLocaleLowerCase())
      )
    );
  }, [data, query]);

  return (
    <DataTable
      columns={columns}
      data={currentData}
      sortFunction={customSort}
      progressPending={pending}
      progressComponent={<Loader />}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="80vh"
      highlightOnHover
    />
  );
}

export default Table;
