"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("user", [
      {
        user_id: "hyunmin",
        password: "1234",
      },
      {
        user_id: "fullfish",
        password: "5678",
      },
      {
        user_id: "yquick",
        password: "2468",
      },
      {
        user_id: "do66i",
        password: "1357",
      },
    ]);

    await queryInterface.bulkInsert("trip", [
      {
        user_id: 1,
        country: "Korea",
        totalPrice: 100000,
        start_date: "2000/01/01",
        end_date: "2001/01/01",
      },
      {
        user_id: 2,
        country: "Korea",
        totalPrice: 200000,
        start_date: "2000/01/01",
        end_date: "2001/01/01",
      },
      {
        user_id: 3,
        country: "Korea",
        totalPrice: 300000,
        start_date: "2000/01/01",
        end_date: "2001/01/01",
      },
      {
        user_id: 4,
        country: "Korea",
        totalPrice: 400000,
        start_date: "2000/01/01",
        end_date: "2001/01/01",
      },
    ]);

    await queryInterface.bulkInsert("account", [
      {
        trip_id: 1,
        category: "음식",
        item_name: "짜장면 10그릇 탕수육",
        price: 100000,
        paid_person: "최현민",
        currency: "KRW",
        write_date: "2022-04-11 11:59:59",
      },
      {
        trip_id: 2,
        category: "기념품",
        item_name: "다이아몬드",
        price: 100000000,
        paid_person: "친구1",
        currency: "KRW",
        write_date: "2022-04-11 11:59:59",
      },
      {
        trip_id: 3,
        category: "생필품",
        item_name: "화장지 칫솔 치약",
        price: 49999,
        paid_person: "친구2",
        currency: "KRW",
        write_date: "2022-04-11 11:59:59",
      },
      {
        trip_id: 4,
        category: "음식",
        item_name: "바베큐용 고기",
        price: 89800,
        paid_person: "친구3",
        currency: "KRW",
        write_date: "2022-04-11 11:59:59",
      },
    ]);

    await queryInterface.bulkInsert("diary", [
      {
        trip_id: 1,
        location: "Seoul",
        content: "너무너무 재미있었다",
        write_date: "2022-04-11 11:59:59",
      },
      {
        trip_id: 2,
        location: "JeonJoo",
        content: "너무너무 좋았다",
        write_date: "2022-04-11 11:59:59",
      },
      {
        trip_id: 3,
        location: "Ulsan",
        content: "너무너무 행복하다",
        write_date: "2022-04-11 11:59:59",
      },
      {
        trip_id: 4,
        location: "Busan",
        content: "너무너무 재미지다",
        write_date: "2022-04-11 11:59:59",
      },
    ]);

    await queryInterface.bulkInsert("hashtag", [
      {
        content: "맛집",
      },
      {
        content: "명소",
      },
      {
        content: "홀리몰리",
      },
    ]);

    await queryInterface.bulkInsert("diary_hashtag", [
      {
        diary_id: 1,
        hashtag_id: 2,
      },
      {
        diary_id: 2,
        hashtag_id: 2,
      },
      {
        diary_id: 3,
        hashtag_id: 2,
      },
      {
        diary_id: 4,
        hashtag_id: 2,
      },
      {
        diary_id: 1,
        hashtag_id: 1,
      },
      {
        diary_id: 2,
        hashtag_id: 1,
      },
    ]);

    return "data Insertion Done";
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete("user", null, {});
    queryInterface.bulkDelete("trip", null, {});
    queryInterface.bulkDelete("diary", null, {});
    queryInterface.bulkDelete("account", null, {});
    queryInterface.bulkDelete("hashtag", null, {});
    queryInterface.bulkDelete("diary_hashtag", null, {});
  },
};
