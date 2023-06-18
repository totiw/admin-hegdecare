import { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Loader from "../../components/Loader";
import axios from "../../api/axios";

// SETTING DATA TYPE
interface DataRow {
  thumbnail: string;
  // user: any[];
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

// SETTING TABLE COLUMN
const columns: TableColumn<DataRow>[] = [
  {
    name: "Image",
    cell: (row) => <img src={row.thumbnail} alt="profile picture" className="w-10 rounded-full" />,
  },
  {
    name: "Price",
    sortable: true,
    selector: (row) => row.price,
  },
  {
    name: "About",
    sortable: true,
    selector: (row) => row.about,
  },
  {
    name: "Address",
    sortable: true,
    selector: (row) => row.address,
  },
  {
    name: "Latitude",
    sortable: true,
    selector: (row) => row.latitude,
  },
  {
    name: "Longitude",
    sortable: true,
    selector: (row) => row.longitude,
  },
  {
    name: "Category",
    sortable: true,
    selector: (row) => row.category,
  },
];

function Table(): JSX.Element {
  const [pending, setPending] = useState(true);
  const [data, setData] = useState([]);
  // GET DATA API
  const getProvider = async () => {
    try {
      const response = await axios.get("/providers");
      setPending(false);
      setData(response.data.data);
    } catch (err: any) {
      setPending(false);
      console.log(err);
    }
  };
  useEffect(() => {
    getProvider();
  }, []);
  return (
    <DataTable
      columns={columns}
      data={data}
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
