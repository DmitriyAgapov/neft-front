'use client'

import {useForm} from "@mantine/form";
import {Button, FileButton, NumberInput, Select, Textarea, TextInput} from "@mantine/core";
import styles from "./Form.module.css";
import {EmailIcon, FileIcon, PhoneIcon} from "@/Components/Icons/Icons";
const purposeData = [
    {value: 'mixers', label: "Перемешивающие устройства"},
    {value: 'controls', label: "Система контроля наличия газа и жидких углеводородов в магистрали"},
    {value: 'signals', label: "Сигнализатор сдвига цистерн"},
    {value: 'hydraulic-tools', label: "Гидравлический инструмент"},
    {value: 'question', label: "Общие вопросы"}
]
const Form = () => {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            message: '',
            file: File,
            name: '',
            company: '',
            cct: '',
            luk: '',
			temp: '',
			climat: '',
            sreda: '',
            volume: "",
            purpose: 'mixers',
            phone: '',
            email: ''
        },
    });

    return (
        <form onSubmit={form.onSubmit((values) => console.log(values))} className={styles.root}>
            <div className={'col-span-full'}>
                <Select
                    withAsterisk
                    classNames={{
                        label: "text-md font-semibold"
                    }}
                    label="Тема обращения"
                    data={purposeData}
                    key={form.key('purpose')}
                    {...form.getInputProps('purpose')}
                />
            </div>


            <div className={''}>
                <NumberInput
                    withAsterisk
                    label="Объем резервуара"
                    placeholder="Введите значение"
                    key={form.key('volume')}
                    {...form.getInputProps('volume')}
                />
            </div>
            <div className={''}>
                <Select
                    withAsterisk
                    classNames={{
                        label: "text-md font-semibold"
                    }}
                    label="Люк-лаз"
                    data={["600x900", "500", "600"]}
					key={form.key('luk')}
                    {...form.getInputProps('luk')}
                />
            </div>
            <div className={''}>
                <NumberInput
                    withAsterisk
                    label="Максимальная вязкость ССТ"
                    placeholder="Введите значение"
                    key={form.key('cct')}
                    {...form.getInputProps('cct')}
                />
            </div>
			<div className={''}>
				<Select
					withAsterisk
					classNames={{
						label: "text-md font-semibold"
					}}
					label="Температура"
					data={["до 100°", "100°-200°"]}
					key={form.key('temp')}
					{...form.getInputProps('temp')}
				/>
			</div>
			<div className={''}>
				<Select
					withAsterisk
					classNames={{
						label: "text-md font-semibold"
					}}
					label="Климатическое исполнение"
					data={["УГ.5", "УХП1"]}
					key={form.key('climat')}
					{...form.getInputProps('climat')}
				/>
			</div>



            <div className={''}>
                <TextInput
                    withAsterisk
                    label="Перемешиваемая среда"
                    placeholder="Введите среду"
                    key={form.key('sreda')}
                    {...form.getInputProps('sreda')}
                />
            </div>

            <div className={''}>
                <TextInput
                    withAsterisk
                    label="Компания"
                    placeholder="Введите название компании"
                    key={form.key('company')}
                    {...form.getInputProps('company')}
                />
            </div>
            <div className={''}>
            <TextInput
                withAsterisk
                label="Имя"
                placeholder="Введите имя"
                key={form.key('name')}
                {...form.getInputProps('name')}
            />
            </div>

            <div className={''}>
            <TextInput
                withAsterisk
                leftSection={<PhoneIcon/>}
                label="Телефон"
                placeholder=""
                key={form.key('phone')}
                {...form.getInputProps('phone')}
            />
            </div>
            <div className={''}>
                <TextInput
                    withAsterisk
                    label="Email"
                    leftSection={<EmailIcon/>}
                    placeholder="your@email.com"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                />
            </div>
            <div className={'col-span-full'}>
            <Textarea
                minRows={4}
                autosize
                label="Cообщение"
                placeholder="Оставте сообщение"
                key={form.key('message')}
                {...form.getInputProps('message')}
            />
            </div>
            <div className={'col-span-full flex'}>
                <FileButton        key={form.key('file')}
                                  {...form.getInputProps('file')}>
                    {(props) => <Button {...props}  unstyled fullWidth classNames={{
                        root: '!border-dashed !border-2 bg-transparent rounded-lg w-full px-6 py-2',
                        inner: ' flex gap-2 items-center leading-none justify-center'
                    }} leftSection={<FileIcon/>} >Выбрать файлы</Button>}
                </FileButton>
            </div>
            <div className={'col-span-full'}>
                <Button fullWidth size={"lg"} type="submit">Оставить заявку</Button>
            </div>
        </form>
    )
}

export default Form
