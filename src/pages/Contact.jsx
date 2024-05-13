import { useEffect, useMemo, useState } from 'react'
import { Switch } from '@headlessui/react'

import { classNames } from 'utils/helpers'
import useCallbackPrompt from 'hooks/useCallbackPrompt';

const Contact = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    agreed: false
  }); // form state
  const haveUnsavedChanges = useMemo(() => {
    return form.firstName !== "" || form.lastName !== "" || form.email !== "" || form.message !== "" || form.agreed;
  }, [form]);
  const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(haveUnsavedChanges);

  // handle form fields on change event
  const handleOnChange = (event) => {
    setForm(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
  }

  // submit form values
  const submitForm = () => {
    localStorage.setItem(`contact${Math.random() * 1000}`, JSON.stringify(form));
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      agreed: false
    });
    alert("Saved");
  }

  useEffect(() => {
    if (showPrompt) {
      const result = window.confirm("There are changes that have not been saved. Save changes now?");
      if (result) {
        submitForm();
        confirmNavigation();
      } else {
        cancelNavigation();
      }
    }
  }, [showPrompt]);

  return (
    <div className="isolate bg-white px-6 py-4 sm:py-2 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>
      <form action="#" method="POST" className="mx-auto mt-6 max-w-xl sm:mt-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="firstName"
                id="first-name"
                autoComplete="given-name"
                value={form.firstName}
                onChange={handleOnChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="lastName"
                id="last-name"
                autoComplete="family-name"
                value={form.lastName}
                onChange={handleOnChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                value={form.email}
                onChange={handleOnChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                name="message"
                id="message"
                rows={4}
                value={form.message}
                onChange={handleOnChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={''}
              />
            </div>
          </div>
          <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={form.agreed}
                onChange={(checked) => handleOnChange({ target: { name: "agreed", value: checked } })}
                className={classNames(
                  form.agreed ? 'bg-indigo-600' : 'bg-gray-200',
                  'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    form.agreed ? 'translate-x-3.5' : 'translate-x-0',
                    'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our{' '}
              <a href="#" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
              .
            </Switch.Label>
          </Switch.Group>
        </div>
        <div className="mt-10">
          <button
            type="button"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => submitForm()}
          >
            Let's talk
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;