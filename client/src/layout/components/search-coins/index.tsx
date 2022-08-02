import { Text } from '@chakra-ui/react';
import { FC, useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { DropdownIndicator, selectStyles } from './styles';

interface SearchCoinsProps {
  searchInput: string;
  // setSearchInput: (input: string) => void;
  // selectedDate: Date;
  // setEmployeeInfo: (employee: IEmployeeSearchInfo | null) => void;
}

const SearchCoins: FC<SearchCoinsProps> = ({ searchInput }) => {
  // const [showSelectedEmployee, setShowSelectedEmployee] =
  //   useState<boolean>(false);

  // useEffect(() => {
  //   setShowSelectedEmployee(false);
  // }, [selectedDate]);

  function containsSpecialChars(str: string) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }

  // const sortEmployees = (
  //   employee1: IEmployeeListItem,
  //   employee2: IEmployeeListItem
  // ): number => {
  //   return employee1.deskId && !employee2.deskId
  //     ? -1 // If employee1 exists in the office and employee2 don't, then employee1 will be first
  //     : !employee1.deskId && employee2.deskId
  //     ? 1 // If employee1 doesn't exist in the office and employee2 does, then employee2 will be first
  //     : 0;
  // };

  const loadOptions = (inputValue: string = '') => {};

  // const loadOptions = (inputValue: string = '') => {
  //   if (inputValue.trim().length >= 3) {
  //     return getEmployeesList(inputValue, selectedDate).then((employees) => {
  //       return (
  //         !containsSpecialChars(inputValue) &&
  //         employees.sort(sortEmployees).map((employee) => {
  //           return {
  //             value: employee.employeeId,
  //             label: (
  //               <SearchEmployeeOption
  //                 name={employee.fullName}
  //                 location={
  //                   employee.deliveryCenterName
  //                     ? `${employee.deliveryCenterName}, ${employee.floorNumber}`
  //                     : 'Out of office'
  //                 }
  //                 isInOffice={employee.deliveryCenterName ? true : false}
  //                 email={employee.email}
  //               />
  //             ),
  //             info: {
  //               deliveryCenterId: employee.deliveryCenterId,
  //               floorId: employee.floorId,
  //               deskId: employee.deskId,
  //             },
  //             isDisabled: employee.deliveryCenterName ? false : true,
  //           };
  //         })
  //       );
  //     });
  //   }
  // };

  return (
    <AsyncSelect
      loadOptions={loadOptions}
      onChange={(e) => {
        // e.info.deliveryCenterId &&
        //   setEmployeeInfo({
        //     deliveryCenterId: e.info.deliveryCenterId,
        //     floorId: e.info.floorId,
        //     deskId: e.info.deskId,
        //   });
        // setShowSelectedEmployee(true);
      }}
      // controlShouldRenderValue={showSelectedEmployee}
      // onInputChange={(e) => {
      //   setSearchInput(e);

      // }}
      components={{ DropdownIndicator, IndicatorSeparator: null }}
      styles={selectStyles}
      placeholder='Search...'
      loadingMessage={() => (
        <Text fontSize='12px'>
          {searchInput.trim().length >= 3
            ? 'Loading...'
            : 'Please enter at least 3 characters'}
        </Text>
      )}
    />
  );
};

export default SearchCoins;
