export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
    this.userEntries = [
      {
        login: "lucascorreaog",
        name: "Lucas Corrêa",
        public_repos: "19",
        followers: "5",
      },
      {
        login: "diego3g",
        name: "Diego Fernandes",
        public_repos: "19",
        followers: "5",
      },
    ];
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);

    this.tbody = this.root.querySelector("table tbody");

    this.update();
  }

  update() {
    this.removeAllTr();

    this.userEntries.forEach((user) => {
      const row = this.createRow();

      row.querySelector(
        ".user img"
      ).src = `https://github.com/${user.login}.png`;
      row.querySelector(".user a").href = `https://github.com/${user.login}`;
      row.querySelector(".user p").textContent = user.name;
      row.querySelector(".user p").textContent = user.name;
      row.querySelector(".repositories").textContent = user.public_repos;
      row.querySelector(".followers").textContent = user.followers;

      this.tbody.append(row);
    });
  }

  createRow() {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td class="user">
        <img
            src="https://github.com/lucascorreaog.png"
            alt="Avatar de Lucas"
        />
        <a href="https://github.com/lucascorreaog" target="_blank"
            ><p>Lucas Corrêa</p>
            <span>lucascorreaog</span></a
        >
        </td>
        <td class="repositories">19</td>
        <td class="followers">5</td>
        <td><button class="remove">Remove</button></td>
    `;

    return tr;
  }

  removeAllTr() {
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });
  }
}
