import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCreditnotes, deleteCreditnote } from '../../redux/features/creditnote/creditNoteActions';
import { Link } from 'react-router-dom';
import { searchCreditnotes } from '../../redux/features/creditnote/searchActions';
import { createCompany, updateCompany, getCompanyDetails } from '../../redux/features/company/companyActions';
import Modal from 'react-modal';
import { useReactToPrint } from 'react-to-print';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BiSearch } from "react-icons/bi";
import Header from "../../components/Header";
import FlexBetween from "../../components/FlexBetween";




const CreditnoteTable = () => {

  const dispatch = useDispatch();
  const creditnotes = useSelector((state) => state.creditnote.creditnotes);

  useEffect(() => {
    dispatch(getCreditnotes());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };




  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiscount, setSelectedDiscount] = useState(0);
  const [selectedclientName, setSelectedclientName] = useState('');
  const [selectedcreditNoteDate, setSelectedcreditNoteDate] = useState('');
  const [selectedcreditNoteNo, setSelectedcreditNoteNo] = useState('');// Store the selected discount
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const handleInvoiceClick = (creditnote) => {
    setSelectedProducts(creditnote.products);
    setSelectedDiscount(creditnote.discount);
    setSelectedclientName(creditnote.clientName)
    setSelectedcreditNoteDate(creditnote.creditNoteDate)
    setSelectedcreditNoteNo(creditnote.creditNoteNo)
    setIsInvoiceModalOpen(true);
  };


  const handleDetailsClick = (creditnote) => {
    setSelectedProducts(creditnote.products);
    setSelectedDiscount(creditnote.discount); // Set the discount here
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteCreditnote(id));
  };


  const handleSearch = () => {
    dispatch(searchCreditnotes(searchQuery));
  };
  const StatusCell = styled.td`
  /* Define styles for the status cell */
`;

  const OpenStatus = styled(StatusCell)`
  color: blue;
`;

  const DraftStatus = styled(StatusCell)`
  color: black;
`;

  const ClosedStatus = styled(StatusCell)`
  color: green;
`;


  const renderStatusCell = (status) => {
    switch (status) {
      case 'open':
        return <OpenStatus>{status}</OpenStatus>;
      case 'draft':
        return <DraftStatus>{status}</DraftStatus>;
      case 'closed':
        return <ClosedStatus>{status}</ClosedStatus>;
      default:
        return <td>{status}</td>;
    }
  };

  const StyledTable = styled.table`
  width: 95%;
  margin: 20px auto;

`;

  const StyledThead = styled.thead`
  
  color: white;
`;

  const StyledTbody = styled.tbody`
  background-color: white;
`;

  const StyledTr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

  const StyledTh = styled.th`
  padding: 12px 15px;
  text-align: left;
`;

  const StyledTd = styled.td`
  padding: 10px 15px;
`;

  const StyledButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

  const StyledLink = styled(Link)`
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background-color: #45a049;
  }
`;


  return (
    <div>
      <FlexBetween style={{ display: "flex", justifyContent: "space-between", padding: "23px" }}><Header title={"Orders Table"} />
        <div>

          <div style={{ display: "flex", border: "3px solid black", padding: "5px", borderRadius: "10px", backgroundColor: "white", color: "black" }} >
            <BiSearch size={18} style={{ margin: "9px", color: "black" }} />
            <input style={{ color: "black", border: "none", padding: "10px" }}
              type="text"
              placeholder="Search by Client Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              onClick={handleSearch}
            />
          </div>
        </div>
      </FlexBetween>
      <StyledTable style={{ border: "3px solid black", borderRadius: "15px" }}>
        <StyledThead>
          <tr style={{ color: "black" }}>
            <StyledTh>Client Name</StyledTh>
            <StyledTh>Credit Note No</StyledTh>
            <StyledTh>Reference</StyledTh>
            <StyledTh>Credit Note Date</StyledTh>
            <StyledTh>Status</StyledTh>
            <StyledTh>Warehouse Name</StyledTh>
            <StyledTh>Actions</StyledTh>
          </tr>
        </StyledThead>
        <StyledTbody>
          {creditnotes.map((creditnote) => (
            <StyledTr key={creditnote._id}>
              <StyledTd>{creditnote.clientName}</StyledTd>
              <StyledTd>{creditnote.creditNoteNo}</StyledTd>
              <StyledTd>{creditnote.Reference}</StyledTd>
              <StyledTd>{formatDate(creditnote.creditNoteDate)}</StyledTd>
              <StyledTd>{renderStatusCell(creditnote.status)}</StyledTd>
              <StyledTd>{creditnote.warehouseName}</StyledTd>
              <StyledTd>
                <StyledButton onClick={() => handleInvoiceClick(creditnote)}>
                  Creditnote
                </StyledButton>
                <StyledButton onClick={() => handleDetailsClick(creditnote)}>
                  Details
                </StyledButton>
                <StyledButton onClick={() => handleDelete(creditnote._id)}>
                  Delete
                </StyledButton>
                <StyledLink to={`/updatecreditnote/${creditnote._id}`}>
                  Edit
                </StyledLink>
              </StyledTd>
            </StyledTr>
          ))}
        </StyledTbody>
      </StyledTable>

      <ProductDetailsModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        products={selectedProducts}
        discount={selectedDiscount} // Pass the discount to the modal
      />
      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onRequestClose={() => setIsInvoiceModalOpen(false)}
        products={selectedProducts}
        discount={selectedDiscount}
        clientName={selectedclientName}
        creditNoteNo={selectedcreditNoteNo}
        formDate={formatDate}
        creditNoteDate={selectedcreditNoteDate}
      />

    </div>
  );
};

const ProductDetailsModal = ({ isOpen, onRequestClose, products, discount, creditNoteNo, creditNoteDate }) => {
  const calculateTotalCost = (product) => {
    const subtotal = product.price * product.quantity;
    const taxAmount = (subtotal * product.taxRate) / 100;
    const totalCost = subtotal + taxAmount;
    return totalCost;
  };

  const calculateTotalAmount = (products) => {
    return products.reduce((total, product) => total + calculateTotalCost(product), 0);
  };

  const totalAmount = calculateTotalAmount(products);
  const grandTotal = totalAmount - (totalAmount * discount) / 100;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Product Details Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          width: '80%',
          maxWidth: '800px',
        },
      }}
    >
      <h2>Product Details</h2>
      <p>Discount: {discount}%</p>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Tax Rate</th>
            <th>Total Cost</th> {/* Display the total cost header */}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.productName}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.taxRate}</td>
              <td>{calculateTotalCost(product)}</td> {/* Display the total cost of each product */}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>Total Amount: {totalAmount}</p>
        <p>Grand Total: {grandTotal}</p>
      </div>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};


const InvoiceModal = ({ isOpen, onRequestClose, products, discount, clientName, creditNoteNo, formDate, creditNoteDate }) => {

  const dispatch = useDispatch();
  const calculateTotalCost = (product) => {
    const subtotal = product.price * product.quantity;
    const taxAmount = (subtotal * product.taxRate) / 100;
    const totalCost = subtotal + taxAmount;
    return totalCost;
  };

  const calculateTotalAmount = (products) => {
    return products.reduce((total, product) => total + calculateTotalCost(product), 0);
  };

  const totalAmount = calculateTotalAmount(products);
  const grandTotal = totalAmount - (totalAmount * discount) / 100;

  //print

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //download
  const handleDownload = () => {
    const section = document.getElementById('pdf-section'); // Change 'pdf-section' to the actual ID of your section

    // Use html2canvas to capture the content as an image with a scale factor
    html2canvas(section, { scrollY: -window.scrollY, scale: 0.85 }).then((canvas) => {
      const imageData = canvas.toDataURL('image/png');

      // Create a jsPDF instance and add the image as a page
      const pdf = new jsPDF();
      pdf.addImage(imageData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

      // Download the PDF
      pdf.save('invoice.pdf');
    });
  };






  //company
  const companyDetails = useSelector(state => state.company.company);

  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    phone: '',
    email: '',
    gstin: '',
  });

  useEffect(() => {
    dispatch(getCompanyDetails());
  }, [dispatch]);

  useEffect(() => {
    if (companyDetails) {
      setFormData({
        companyName: companyDetails.companyName,
        address: companyDetails.address,
        phone: companyDetails.phone.toString(),
        email: companyDetails.email,
        gstin: companyDetails.gstin,
      });
    }
  }, [companyDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (companyDetails) {
      dispatch(updateCompany(formData));
    } else {
      dispatch(createCompany(formData));
    }

    setFormData({
      companyName: '',
      address: '',
      phone: '',
      email: '',
      gstin: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const ModalContent = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 margin-bottom: 20px;
`;
  const CloseButton = styled.button`
  background-color: #ccc;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
`;
  const ProductTableHeader = styled.th`
  background-color: #f2f2f2;
  font-weight: bold;
  text-align: left;
  padding: 8px;
  border: 1px solid #ccc;
`;
  const FormSection = styled.div`
margin-bottom: 20px;
label {
  color: black;
  font-weight: bold;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 10px;
  border: 2px solid black;
  border-radius: 7px;
}
`;
  const SubmitButton = styled.button`
background-color: #007bff;
color: white;
padding: 10px 20px;
border: none;
border-radius: 5px;
cursor: pointer;
font-size: 16px;
transition: background-color 0.3s ease;

&:hover {
  background-color: #0056b3;
}
`;

  const SectionContainer = styled.div`
display: flex;
flex-direction: row;
`;

  const InvoiceSection = styled.div`
flex: 1;
padding: 10px;
background-color: #f9f9f9;
border-radius: 4px;
margin-right: ${props => (props.larger ? '20px' : '0')};
`;

  const SectionHeading = styled.h2`
font-size: 1.2rem;
color: black;
margin-bottom: 10px;
`;

  const CompanyDetails = styled.div`
color: black;
width:350px;
p {
  margin: 5px 0;
}
`;

  const BillTo = styled.div`
color: black;
width:350px;
p {
  margin: 5px 0;
}
`;

  const ProductDetails = styled.div`
  margin-top: 20px;
`;

  const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    
    padding: 8px;
  }
  th {
    background-color: #36454F;
  }
`;
  const CustomModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -50%);
  width: 80%;
  max-width: 1500px; /* Adjust the maximum width as needed */
  height: auto;
  background-color: white;
  border-radius: 8px;
  border: 2px solid black;
  padding: 20px;
  box-shadow: 4px 4px black;
  z-index: 1000;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Invoice Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          width: '80%',
          maxWidth: '800px',
        },
      }}
    >

      <ModalContent>
        <FormSection>
          <h1 style={{ fontSize: "1.5rem", color: "black" }} >Your company details</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="companyName">Company Name</label>
              <input style={{ color: "black" }}
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
              />
            </div>
            <div>
              <label htmlFor="address">address</label>
              <input style={{ color: "black" }}
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
              />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input style={{ color: "black" }}
                type="number"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input style={{ color: "black" }}
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>
            <div>
              <label htmlFor="gstin">GSTIN</label>
              <input style={{ color: "black" }}
                type="text"
                id="gstin"
                name="gstin"
                value={formData.gstin}
                onChange={handleChange}
                placeholder="Enter GSTIN"
              />
            </div>
            <SubmitButton style={{ marginTop: "16px", width: '100%', backgroundColor: "#d19fe8", fontSize: "20px" }} type="submit">Submit</SubmitButton>
            <div style={{ display: "flex", gap: "7px" }}>
              <button type="primary" style={{ marginTop: "16px", width: '100%', backgroundColor: "#d19fe8", borderRadius: "5px", fontSize: "20px" }} onClick={handlePrint}>Print</button>
              <button type="button" style={{ marginTop: "16px", width: '100%', backgroundColor: "#d19fe8", borderRadius: "5px", fontSize: "20px" }} onClick={handleDownload}>Download</button>

            </div>

          </form>
        </FormSection>






        <section id="pdf-section" ref={componentRef} style={{ width: "950px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding: "30px" }}>
          <SectionContainer style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
              <InvoiceSection>

                <CompanyDetails style={{ flexDirection: "column", marginTop: "27px", padding: "15px" }}>
                  <p style={{ display: "flex", justifyContent: "flex-start" }}> {formData.companyName}</p>
                  <p style={{ display: "flex", justifyContent: "flex-start" }}> {formData.address}</p>
                  <p style={{ display: "flex", justifyContent: "flex-start" }}> {formData.phone}</p>
                  <p style={{ display: "flex", justifyContent: "flex-start" }}> {formData.email}</p>
                  <p style={{ display: "flex", justifyContent: "flex-start" }}><strong style={{ marginRight: "8px" }}>GSTIN:</strong> {formData.gstin}</p>
                </CompanyDetails>
              </InvoiceSection>
              <InvoiceSection >
                <h1 style={{ fontSize: "2.8rem", fontWeight: "bold", marginLeft: "10px", display: "flex", justifyContent: "flex-end", color: "black" }}>Credit Note</h1>
                <p style={{ display: "flex", justifyContent: "flex-end", color: "black" }}>CreditNote #{creditNoteNo}</p>
              </InvoiceSection>
            </div>
            <div style={{ display: "flex" }}>
              <InvoiceSection style={{ marginTop: "25px" }}>
                <BillTo style={{ display: "flex", flexDirection: "row", }}>
                  <div><SectionHeading style={{ display: "flex", justifyContent: "flex-start", fontWeight: "bold" }}>Bill To</SectionHeading>
                    <p style={{ display: "flex", justifyContent: "flex-start" }}> {clientName}</p></div>



                </BillTo>
              </InvoiceSection>
              <InvoiceSection style={{ marginTop: "25px" }}>

                <p style={{ display: "flex", justifyContent: "flex-end", color: "black" }}> Creditnote Date: {formDate(creditNoteDate)}</p>

              </InvoiceSection>
            </div>


          </SectionContainer>
          <InvoiceSection >
            <SectionHeading>Product Details</SectionHeading>
            <ProductDetails>
              <ProductTable>
                <thead >
                  <tr style={{ backgroundColor: "#d19fe8" }}>
                    <ProductTableHeader style={{ backgroundColor: "#d19fe8", color: "white" }}>Product Name</ProductTableHeader>
                    <ProductTableHeader style={{ backgroundColor: "#d19fe8", color: "white" }}>Price</ProductTableHeader>
                    <ProductTableHeader style={{ backgroundColor: "#d19fe8", color: "white" }}>Quantity</ProductTableHeader>
                    <ProductTableHeader style={{ backgroundColor: "#d19fe8", color: "white" }}>TaxRate(%)</ProductTableHeader>
                    <ProductTableHeader style={{ backgroundColor: "#d19fe8", color: "white" }}>SubTotal</ProductTableHeader>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.productName}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>{product.taxRate}</td>
                      <td>{calculateTotalCost(product)}</td> {/* Display the total cost of each product */}
                    </tr>
                  ))}
                </tbody>
              </ProductTable>

              <h4 style={{ color: "black", marginTop: "10px", display: "flex", justifyContent: "flex-end", backgroundColor: "#F1EDF2", paddingRight: "10px" }}>  Sub Total:  ₹{totalAmount}</h4>
              <p style={{ color: "black", fontWeight: "bold", display: "flex", justifyContent: "flex-end", backgroundColor: "#F1EDF2", paddingRight: "10px" }}>Discount: {discount}%</p>
              <h4 style={{ color: "black", fontWeight: "bold", marginTop: "10px", display: "flex", justifyContent: "flex-end", backgroundColor: "#F1EDF2", padding: "10px" }}>Credits Remaining:  ₹{grandTotal}</h4>
            </ProductDetails>
          </InvoiceSection>

        </section>







      </ModalContent>
      <button style={{ marginTop: "16px", backgroundColor: "#d19fe8", borderRadius: "5px", padding: "10px", fontSize: "20px" }} onClick={onRequestClose}>Close</button>

    </CustomModal>
  );
};


export default CreditnoteTable;
