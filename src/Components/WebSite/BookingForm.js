import React, { useState } from 'react';
import '../../Assets/Styles/WebSite/BookingForm.css';
import { useForm } from 'react-hook-form';
import bgImg from '../../Assets/Styles/Images/tina.png';
import Layout from './Layout';
import DatePicker, { registerLocale } from "react-datepicker";
import el from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("el", el);


const BookingForm = () => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [topicListFromShoppingCart, setTopicListFromShoppingCart] = useState([]);

    const { register, handleSubmit } = useForm()

    const onSubmit = data => {

        const client = {
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber
        };

        const bookingData = {
                quantity: data.quantity,
                address: data.address,
                description: data.description,
                date: selectedDate,
                client: client,
                confirm: false,
                isPaid: false,
                cost: null,
                topic: topicListFromShoppingCart
            };
    
            console.log(bookingData);
            saveData(bookingData);

    };
    

    

    async function saveData(bookingData) {
        try {
            await fetch('/api/booking/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            }).then((response) => response.text())
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error('Error ', error);
                });
        } catch (error) {
            console.error('An error occurred', error);
        }
    }



    return (
        <Layout showSubNav={true}>
            <section className='BookingForm'>
                <div className="register">
                    <div className="col-1">
                        <h2>Solicitar Reserva</h2>
                        <span>Envianos tus datos y pronto te enviaremos un presupuesto adaptado para vos</span>

                        <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" {...register("name")} placeholder='Nombre' />
                            <input type="email" {...register("email")} placeholder='Email' required />
                            <input type="text" {...register("phoneNumber")} placeholder='Teléfono' />
                            <input type="number" min="0" {...register("quantity")} placeholder='Cantidad de niños estimada' required />
                            <input type="text" {...register("address")} placeholder='Dirección del evento' required />
                            <DatePicker
                                locale="el"
                                placeholderText='Fecha'
                                selected={selectedDate}
                                onChange={date => setSelectedDate(date)}
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()}
                                required
                            />

                            <textarea type="text" {...register("description")} placeholder='Comentarios...' />
                            <button className='btn'>SOLICITAR RESERVA</button>
                        </form>

                    </div>
                    <div className="col-2">
                        <img src={bgImg} alt="" />
                    </div>
                </div>
            </section>
        </Layout>
    )
};

export default BookingForm;
